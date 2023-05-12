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
    super(props), (this.handleFileUpload = this.handleFileUpload.bind(this));
  }

  handleFileUpload(e) {
    e.preventDefault();
    this.props.handleAudio(e.target.audio.value);
  }

  render() {
    return (
      <div>
        <h3>Drag Drop</h3>
        <form onSubmit={this.handleFileUpload}>
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

const Msg = (props) => {
  const { owner, str, desk } = props;
  const isOwner = str.split(":")[0] === owner;
  const speaker = isOwner ? owner : desk;
  const msg = isOwner
    ? str.replace(`${owner}:`, "")
    : str.replace(`${desk}:`, "");
  return (
    <div>
      <h4>{speaker}</h4>
      <p>{msg}</p>
    </div>
  );
};

const Transcript = (props) => {
  const transcript = props.transcript
    .split("[")
    .filter((msg) => msg !== "")
    .map((msg) =>
      msg
        .replace("Pet Owner]", props.petOwner.split(" ")[0])
        .replace("Vet Front Desk]", props.vetDesk)
    );
  const owner = props.petOwner.split(" ")[0];
  return (
    <div>
      {transcript.map((str, i) => (
        <Msg key={i} str={str} owner={owner} desk={props.vetDesk} />
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
    super(props),
      ((this.createContentArray = this.createContentArray.bind(this)),
      (this.state = props.analytics));
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
    super(props),
      ((this.handleAudio = this.handleAudio.bind(this)),
      (this.state = {
        practiceName: props.practiceName,
        logoUrl: props.logoUrl,
        transcript: props.transcript,
        analytics: props.analytics,
        history: props.history,
      }));
  }
  handleAudio(audioFile) {
    // const transcript = trancriptAPI(audioFile); return string
    // update this.state.transcript = transcript
    // const analytics = analyticsAPI(transcript); return JSON obj
    // update this.state.analytics = analytics
    console.log(audioFile);
  }
  render() {
    const { practiceName, logoUrl, transcript, analytics, history } =
      this.state;
    const petOwner = analytics["critical_details"]["pet_owner_name"];
    return (
      <div>
        <Header practiceName={practiceName} />
        <UploadFile handleAudio={this.handleAudio} />
        <HistoryList history={history} />
        <Transcript transcript={transcript} petOwner={petOwner} />
        <Analytics analytics={analytics} />
      </div>
    );
  }
}

const transcript = `[Pet Owner]: Good morning, I'm calling to schedule an
appointment for my dog, Max. He's been experiencing some discomfort lately
and I'd like to get him checked out.
[Vet Front Desk]: Good morning! I'm sorry to hear that Max is not feeling
well. We'd be happy to help. To better assist you, may I have your name
and Max's details, like breed and age, please?
[Pet Owner]: Sure, my name is Sarah Johnson, and Max is a 6-year-old
Golden Retriever.
[Vet Front Desk]: Thank you, Sarah. I see Max's records here in our
system. Is he up to date on his vaccines?
[Pet Owner]: Yes, he had his vaccines last year, and as far as I know,
he's up to date.
[Vet Front Desk]: Great! That's always helpful information for us to know.
Now, let's find the perfect time for Max's appointment. We have some
availability this week. Would you prefer a morning or afternoon
appointment?
[Pet Owner]: I'd prefer a morning appointment if possible.
[Vet Front Desk]: We have a few openings tomorrow morning, one at 9:00 AM
and another at 10:30 AM. Would either of those work for you?
[Pet Owner]: The 10:30 AM appointment would be perfect.
[Vet Front Desk]: Great, I've scheduled Max for 10:30 AM tomorrow morning.
Just to confirm, you mentioned he's been experiencing some discomfort.
Could you provide some more details about his symptoms, so the
veterinarian can be better prepared for the appointment?
[Pet Owner]: Of course. He's been limping a bit, especially after going
for walks or playing outside. He also seems to be licking his paws more
than usual, and I think he might have a rash or some irritation on them.
[Vet Front Desk]: Thank you for providing that information, Sarah. I'll
make a note of those symptoms in Max's appointment details, so the
veterinarian will be aware of them. Is there anything else you'd like us
to know before the appointment?
[Pet Owner]: No, I think that covers everything.
[Vet Front Desk]: Alright, we'll see you and Max tomorrow at 10:30 AM. If
you need to reschedule or have any questions before the appointment,
please don't hesitate to call us.
[Pet Owner]: Thank you so much, I appreciate your help. We'll see you
tomorrow.
[Vet Front Desk]: You're welcome, Sarah. Have a great day, and we'll see
you and Max soon. Goodbye!
[Pet Owner]: Goodbye!`;

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
  transcript: transcript,
  analytics: analytics,
  history: [],
};

ReactDOM.render(<VetCallReviewApp />, document.getElementById("app"));
