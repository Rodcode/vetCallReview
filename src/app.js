import axios from "axios";

const Header = (props) => {
  const { logoUrl, practiceName } = props;
  return (
    <div>
      <img src={logoUrl} alt={practiceName + " Logo goes here."} />
      <p>{practiceName} Vet Front Desk Call Review</p>
    </div>
  );
};

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload = async (event) => {
    event.preventDefault();
    const audioFile = event.target.elements.audio.files[0];
    this.props.handleAudio(audioFile);
  };

  render() {
    return (
      <div>
        <h3>Drag Drop</h3>
        <form encType="multipart/form-data" onSubmit={this.handleFileUpload}>
          <input type="file" name="audio"></input>
          <button>Upload</button>
        </form>
      </div>
    );
  }
}

const HistoryList = (props) => {
  return (
    <div>
      <h2>History</h2>
      {props.history.length > 0 ? (
        <ol>
          {props.history.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ol>
      ) : (
        <p>Accesible List of most recent call reports</p>
      )}
    </div>
  );
};

// ...

const Transcript = (props) => {
  if (!props.transcript) {
    return <p>No transcript available</p>;
  }

  const transcript = props.transcript.text;

  // Extract speakers and replace them with the names from props
  const speakers = Object.keys(transcript).map((key) => {
    const speaker = key === "speaker_1" ? props.petOwner.split(" ")[0] : props.vetDesk;
    return { speaker, text: transcript[key] };
  });

  return (
    <div>
      {speakers.map((speakerObj, i) => (
        <div key={i}>
          <strong>{speakerObj.speaker}: </strong>
          <span>{speakerObj.text}</span>
        </div>
      ))}
    </div>
  );
};

Transcript.defaultProps = {
  petOwner: "Pet Owner",
  vetDesk: "Vet Front Desk",
};

const Grade = (props) => {
  const { grade, tone } = props;
  return (
    <div>
      <h1>{grade}</h1>
      <h4>{tone}</h4>
    </div>
  );
};

const CriticalDetails = (props) => {
  return (
    <div>
      {props.details.map((detail, i) => {
        return <p key={i}>{detail}</p>;
      })}
    </div>
  );
};

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.createContentArray = this.createContentArray.bind(this);
    this.state = props.analytics;
  }

  formatCategory(cat) {
    let arr = cat.replaceAll("_", " ").toUpperCase();

    return arr + ":";
  }

  formatItem(item) {
    if (typeof item === "string") {
      let arr = item.split("");
      arr[0] = arr[0].toUpperCase();

      return arr.join("") + ".";
    }
    return item;
  }

  createContentArray(obj) {
    let content = [];
    for (const i in obj) {
      content.push(this.formatCategory(i));
      if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
        const temp = this.createContentArray(obj[i]);
        for (const j in temp) {
          content.push(temp[j]);
        }
      } else if (Array.isArray(obj[i])) {
        let newArr = obj[i].map((obj) => this.formatItem(obj));
        content = [...content, ...newArr];
      } else {
        content.push(this.formatItem(obj[i]));
      }
    }
    return content;
  }
  render() {
    const analytics = this.createContentArray(this.state);
    console.log(analytics);
    const grade = analytics.pop();
    const tone = analytics[1].toUpperCase().replace(".", "");
    analytics.pop();
    analytics.pop();
    const details = analytics.slice(2);

    return (
      <div>
        <Grade grade={grade} tone={tone} />
        <CriticalDetails details={details} />
      </div>
    );
  }
}

class VetCallReviewApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleAudio = this.handleAudio.bind(this);
    this.state = {
      practiceName: props.practiceName,
      logoUrl: props.logoUrl,
      transcript: props.transcript,
      analytics: props.analytics,
      history: props.history,
    };
  }
  handleAudio = async (audioFile) => {
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    console.log(audioFile);
  
    const apiKey = "123"; // temporary
  
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/transcribe?api_key=${apiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //"Authorization": apiKey,
          },
        }
      );
      const responseJson = JSON.parse(response.data.response);
      const transcript = responseJson;
      this.setState({ transcript });
  
      // Call analytics endpoint if needed
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { practiceName, logoUrl, transcript, analytics, history } =
      this.state;
    const petOwner = analytics["critical_details"]["pet_owner_name"];
    return (
      <div>
        <Header practiceName={practiceName} logoUrl={logoUrl} />
        <UploadFile handleAudio={this.handleAudio} />
        <HistoryList history={history} />
        <Transcript transcript={transcript} petOwner={petOwner} />
        <Analytics analytics={analytics} />
      </div>
    );
  }
}

// temp data
const transcript = null
const analytics = {
  tone_of_call: "friendly and helpful",
  critical_details: {
    pet_owner_name: "Sarah Johnson",
    dog_name: "Max",
    breed: "Golden Retriever",
    age: 6,
    vaccines: "up to date",
    symptoms: [
      "limping",
      "licking paws",
      "possible rash or irritation on paws",
    ],
    "appointment_date_&_time": "tomorrow, 10:30 AM",
  },
  "offerings_add-ons": [],
  overall_tone_grade: 10,
};

VetCallReviewApp.defaultProps = {
  practiceName: "[Veterinary Practices Name]",
  logoUrl: "",
  file: {},
  transcript: null,
  analytics: analytics,
  history: [],
};

ReactDOM.render(<VetCallReviewApp />, document.getElementById("app"));