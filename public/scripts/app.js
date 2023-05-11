"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function Header(props) {
  var logoUrl = props.logoUrl,
      practiceName = props.practiceName;

  return React.createElement(
    "div",
    null,
    React.createElement("img", { src: logoUrl, alt: practiceName + " Logo goes here." }),
    React.createElement(
      "p",
      null,
      practiceName,
      " Vet Front Desk Call Review"
    )
  );
};

var UploadFile = function (_React$Component) {
  _inherits(UploadFile, _React$Component);

  function UploadFile(props) {
    var _this;

    _classCallCheck(this, UploadFile);

    (_this = _possibleConstructorReturn(this, (UploadFile.__proto__ || Object.getPrototypeOf(UploadFile)).call(this, props)), _this), _this.handleFileUpload = _this.handleFileUpload.bind(_this);
    return _this;
  }

  _createClass(UploadFile, [{
    key: "handleFileUpload",
    value: function handleFileUpload(e) {
      e.preventDefault();
      this.props.handleAudio(e.target.audio.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Drag Drop"
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleFileUpload },
          React.createElement("input", { type: "file", name: "audio" }),
          React.createElement(
            "button",
            null,
            "Upload"
          )
        )
      );
    }
  }]);

  return UploadFile;
}(React.Component);

var HistoryList = function HistoryList(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h2",
      null,
      "History"
    ),
    props.history.length > 0 ? React.createElement(
      "ol",
      null,
      props.history.map(function (id) {
        return React.createElement(
          "li",
          { key: id },
          id
        );
      })
    ) : React.createElement(
      "p",
      null,
      "Accesible List of most recent call reports"
    )
  );
};

var Transcript = function Transcript(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      null,
      props.transcript
    )
  );
};

var Analytics = function (_React$Component2) {
  _inherits(Analytics, _React$Component2);

  function Analytics(props) {
    var _this2;

    _classCallCheck(this, Analytics);

    (_this2 = _possibleConstructorReturn(this, (Analytics.__proto__ || Object.getPrototypeOf(Analytics)).call(this, props)), _this2), _this2.state = {
      tone: props["tone_of_call"]
    };
    return _this2;
  }

  _createClass(Analytics, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          JSON.stringify(this.props.analytics)
        )
      );
    }
  }]);

  return Analytics;
}(React.Component);

var VetCallReviewApp = function (_React$Component3) {
  _inherits(VetCallReviewApp, _React$Component3);

  function VetCallReviewApp(props) {
    var _this3;

    _classCallCheck(this, VetCallReviewApp);

    (_this3 = _possibleConstructorReturn(this, (VetCallReviewApp.__proto__ || Object.getPrototypeOf(VetCallReviewApp)).call(this, props)), _this3), (_this3.handleAudio = _this3.handleAudio.bind(_this3), _this3.state = {
      practiceName: props.practiceName,
      logoUrl: props.logoUrl,
      transcript: props.transcript,
      analytics: props.analytics,
      history: props.history
    });
    return _this3;
  }

  _createClass(VetCallReviewApp, [{
    key: "handleAudio",
    value: function handleAudio(audioFile) {
      // const transcript = trancriptAPI(audioFile); return string
      // update this.state.transcript = transcript
      // const analytics = analyticsAPI(transcript); return JSON obj
      // update this.state.analytics = analytics
      console.log(audioFile);
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          practiceName = _state.practiceName,
          logoUrl = _state.logoUrl,
          transcript = _state.transcript,
          analytics = _state.analytics,
          history = _state.history;

      return React.createElement(
        "div",
        null,
        React.createElement(Header, { practiceName: practiceName }),
        React.createElement(UploadFile, { handleAudio: this.handleAudio }),
        React.createElement(HistoryList, { history: history }),
        React.createElement(Transcript, { transcript: transcript }),
        React.createElement(Analytics, { analytics: analytics })
      );
    }
  }]);

  return VetCallReviewApp;
}(React.Component);

var transcript = "[Pet Owner]: Good morning, I'm calling to schedule an\nappointment for my dog, Max. He's been experiencing some discomfort lately\nand I'd like to get him checked out.\n[Vet Front Desk]: Good morning! I'm sorry to hear that Max is not feeling\nwell. We'd be happy to help. To better assist you, may I have your name\nand Max's details, like breed and age, please?\n[Pet Owner]: Sure, my name is Sarah Johnson, and Max is a 6-year-old\nGolden Retriever.\n[Vet Front Desk]: Thank you, Sarah. I see Max's records here in our\nsystem. Is he up to date on his vaccines?\n[Pet Owner]: Yes, he had his vaccines last year, and as far as I know,\nhe's up to date.\n[Vet Front Desk]: Great! That's always helpful information for us to know.\nNow, let's find the perfect time for Max's appointment. We have some\navailability this week. Would you prefer a morning or afternoon\nappointment?\n[Pet Owner]: I'd prefer a morning appointment if possible.\n[Vet Front Desk]: We have a few openings tomorrow morning, one at 9:00 AM\nand another at 10:30 AM. Would either of those work for you?\n[Pet Owner]: The 10:30 AM appointment would be perfect.\n[Vet Front Desk]: Great, I've scheduled Max for 10:30 AM tomorrow morning.\nJust to confirm, you mentioned he's been experiencing some discomfort.\nCould you provide some more details about his symptoms, so the\nveterinarian can be better prepared for the appointment?\n[Pet Owner]: Of course. He's been limping a bit, especially after going\nfor walks or playing outside. He also seems to be licking his paws more\nthan usual, and I think he might have a rash or some irritation on them.\n[Vet Front Desk]: Thank you for providing that information, Sarah. I'll\nmake a note of those symptoms in Max's appointment details, so the\nveterinarian will be aware of them. Is there anything else you'd like us\nto know before the appointment?\n[Pet Owner]: No, I think that covers everything.\n[Vet Front Desk]: Alright, we'll see you and Max tomorrow at 10:30 AM. If\nyou need to reschedule or have any questions before the appointment,\nplease don't hesitate to call us.\n[Pet Owner]: Thank you so much, I appreciate your help. We'll see you\ntomorrow.\n[Vet Front Desk]: You're welcome, Sarah. Have a great day, and we'll see\nyou and Max soon. Goodbye!\n[Pet Owner]: Goodbye!";

var analytics = {
  tone_of_call: "friendly and helpful",
  critical_details: {
    pet_owner_name: "Sarah Johnson",
    dog_name: "Max",
    breed: "Golden Retriever",
    age: 6,
    vaccines: "up to date",
    symptoms: ["limping", "licking paws", "possible rash or irritation on paws"],
    appointment_date_time: "tomorrow, 10:30 AM"
  },
  offerings_add_ons: [],
  overall_tone_grade: 10
};

VetCallReviewApp.defaultProps = {
  practiceName: "[Veterinary Practices Name]",
  logoUrl: "",
  file: {},
  transcript: transcript,
  analytics: analytics,
  history: []
};

ReactDOM.render(React.createElement(VetCallReviewApp, null), document.getElementById("app"));
