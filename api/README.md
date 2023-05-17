# FastAPI Project

This project is a FastAPI application that provides a RESTful API for various operations. FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.

## Requirements

- Python 3.7+
- FastAPI
- Uvicorn (ASGI server)

## Installation

1. Make sure you have Python 3.7+ installed on your system. You can check the version of Python by running:

```bash
python --version
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Linux or macOS
.\venv\Scripts\activate   # On Windows
```

3. Install the required packages:

```bash
pip install fastapi uvicorn
```

## Running the Application

1. Navigate to the directory containing your FastAPI application (e.g., `main.py`):

```bash
cd path/to/your/fastapi/app
```

2. Run the application using Uvicorn:

```bash
uvicorn main:app --reload
```

This command assumes that your FastAPI application is defined in a filecalled `main.py` and the FastAPI instance is named `app`. Replace `main:app` with the appropriate module and variable name if necessary.

The `--reload` flag enables auto-reloading, so the server will automatically reload when you make changes to the code.

3. Access the API in your web browser or using a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/). The default address for the FastAPI application is:

```
http://127.0.0.1:8000
```

You can also access the automatically generated interactive API documentation at:

```
http://127.0.0.1:8000/docs
```

Or the alternative ReDoc documentation at:

```
http://127.0.0.1:8000/redoc
```

## Running Tests (Optional)

If your FastAPI project includes tests, you can run them using a test runner like `pytest`. First, install `pytest`:

```bash
pip install pytest
```

Then, run the tests in your project directory:

```bash
pytest
```

### Setting OPENAI_API_KEY and API_KEY

1. Open the Command Prompt by searching for "cmd" in the Start menu and selecting "Command Prompt".

2. To set the `OPENAI_API_KEY` environment variable, run the following command, replacing `your_openai_api_key` with your actual API key:

```cmd
setx OPENAI_API_KEY "your_openai_api_key"
```

3. To set the `API_KEY` environment variable, run the following command, replacing `your_api_key` with your actual API key:

```cmd
setx API_KEY "your_api_key"
```

### Curl commands for the API:

1. To check the health of the API:

```bash
curl -X GET "http://localhost:8000/health?api_key=YOUR_API_KEY"
```

Replace `YOUR_API_KEY` with the actual API key.

2. To transcribe an audio file:

```bash
curl -X POST "http://localhost:8000/transcribe?api_key=YOUR_API_KEY" -H "Content-Type: multipart/form-data" -F "audio_file=@/path/to/your/audio_file.wav"
```

Replace `YOUR_API_KEY` with the actual API key and `/path/to/your/audio_file.wav` with the path to the audio file you want to transcribe.

3. To analyze a transcript:

```bash
curl -X POST "http://localhost:8000/analyze?api_key=YOUR_API_KEY" -H "Content-Type: application/json" -d '{"transcript": "Put the transcript text here"}'
```

Replace `YOUR_API_KEY` with the actual API key and `Put the transcript text here` with the transcript text you want to analyze.