import os
import tempfile
import openai
from fastapi import FastAPI, Depends, Header, HTTPException, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
import io
from typing import List, Optional
import shutil
from pathlib import Path
from tempfile import NamedTemporaryFile

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:1234",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the OpenAI API client
openai.api_key = os.getenv("OPENAI_API_KEY")


async def verify_api_key(request: Request):
    api_key = request.query_params.get("api_key")
    if api_key != os.getenv("API_KEY"):
        raise HTTPException(status_code=401, detail="Invalid API key")
    return api_key


@app.get("/health")
async def health(api_key: str = Depends(verify_api_key)):
    return {"message": "API is running properly"}


@app.post("/transcribe")
async def transcribe(
    api_key: str = Depends(verify_api_key), audio_file: UploadFile = File(...)
):
    print(f"API key received: {api_key}")
    contents = await audio_file.read()

    # Save the uploaded file temporarily
    file_extension = os.path.splitext(audio_file.filename)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
        # Reset the file pointer to the beginning of the audio_file.file
        audio_file.file.seek(0)
        shutil.copyfileobj(audio_file.file, temp_file)
        temp_file_path = temp_file.name

    # Transcribe the audio file
    with open(temp_file_path, "rb") as file_to_transcribe:
        # Reset the file pointer to the beginning of the file
        transcript = openai.Audio.transcribe("whisper-1", file_to_transcribe)

    # Clean up the temporary file
    os.remove(temp_file_path)

    # Reorganize the transcript to be ready for consumption
    prompt = f"""
    Format the following as json. Separate speakers: {transcript}.Use this contract:
    'speaker_1': '...', 'speaker_2': '...'. the outer-most node should be 'text'
    """

    response = openai.ChatCompletion.create(
        model="gpt-4", temperature=1, messages=[{"role": "user", "content": prompt}]
    )

    return {"response": response.choices[0].message.content}


@app.post("/analyze")
async def analyze(transcript: str, api_key: str = Depends(verify_api_key)):

    prompt = f"read the following transcript and describe the tone of the call, highlight critical details that the vet and staff should know, list any offerings or add-ons suggested by the front desk, and grade the overall tone of the conversation on a scale from 1-10 where 1 means the conversation did not go well and 10 the conversation went extrememly well. Output to JSON format: {transcript}"

    # Call the OpenAI chat API
    response = openai.ChatCompletion.create(
        model="gpt-4", temperature=1, messages=[{"role": "user", "content": prompt}]
    )

    return {"response": response.choices[0]["text"]}
