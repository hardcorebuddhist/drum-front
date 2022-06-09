import { useEffect, useState } from "react";
import * as Tone from "tone";
import { useDispatch, useSelector } from "react-redux";
import { GrPlay } from "react-icons/gr";
import { IoMdPause } from "react-icons/io";
import { VscDebugStop } from "react-icons/vsc";

const kick = new Tone.Player(
  "https://audio.jukehost.co.uk/JRVKYWCmgRxpKCI3ijAsm61z29599GmC"
).toDestination();
const snare = new Tone.Player(
  "https://audio.jukehost.co.uk/nA3BlaP27nLNre0gHihDWhDngWeg5HAk"
).toDestination();
const clap = new Tone.Player(
  "https://audio.jukehost.co.uk/ovksH6BwP0eyhnMMITe8cijRDP8cmPQR"
).toDestination();
const tom = new Tone.Player(
  "https://audio.jukehost.co.uk/ruoGZEOmXLugBKDsFhwWoS43Va1U6GOk"
).toDestination();
const ch = new Tone.Player(
  "https://audio.jukehost.co.uk/xQyC8nIW7CxX6O7L9y68NDFuNI9bBKIA"
).toDestination();
const oh = new Tone.Player(
  "https://audio.jukehost.co.uk/MLaQPc07Eg9RYDtj19Y708ZWHMf4ZWyu"
).toDestination();
const crash = new Tone.Player(
  "https://audio.jukehost.co.uk/J3XUUjWl7nb9qK69HO8rgbri1c7YC3GM"
).toDestination();

export const DrumMachine = () => {
  const [inputs, setInputs] = useState({
    KICK: new Array(16).fill(false),
    SNARE: new Array(16).fill(false),
    CLAP: new Array(16).fill(false),
    TOM: new Array(16).fill(false),
    CH: new Array(16).fill(false),
    OH: new Array(16).fill(false),
    CRASH: new Array(16).fill(false),
  });

  const [bpm, setBpm] = useState(80);

  // const dispatch = useDispatch();
  // const bpm = useSelector(selectBpm);

  const check = (type, idx) => {
    const newInputs = [...inputs[type]];
    newInputs[idx] = !newInputs[idx];
    setInputs({ ...inputs, [type]: newInputs });
  };

  useEffect(() => {
    Tone.Transport.stop();
    let step = 0;
    function repeat() {
      let index = step % 16;
      if (inputs.KICK[index]) {
        kick.start();
      }
      if (inputs.SNARE[index]) {
        snare.start();
      }
      if (inputs.CLAP[index]) {
        clap.start();
      }
      if (inputs.TOM[index]) {
        tom.start();
      }
      if (inputs.CH[index]) {
        ch.start();
      }
      if (inputs.OH[index]) {
        oh.start();
      }
      if (inputs.CRASH[index]) {
        crash.start();
      }

      step++;
    }
    const eventId = Tone.Transport.scheduleRepeat(repeat, "16n");
    Tone.Transport.bpm.value = bpm;

    // Tone.Transport.start();

    return () => Tone.Transport.clear(eventId);
  }, [inputs, bpm]);

  const handleBpm = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${bpm}`);
  };

  const play = () => {
    !Tone.Transport.start() ? Tone.Transport.stop() : Tone.Transport.start();
  };

  const pause = () => {
    Tone.Transport.start() ? Tone.Transport.pause() : Tone.Transport.start();
  };

  const stop = () => {
    Tone.Transport.start() ? Tone.Transport.stop() : Tone.Transport.start();
  };

  const handleDrums = () => {
    setInputs({
      KICK: new Array(16).fill(false),
      SNARE: new Array(16).fill(false),
      CLAP: new Array(16).fill(false),
      TOM: new Array(16).fill(false),
      CH: new Array(16).fill(false),
      OH: new Array(16).fill(false),
      CRASH: new Array(16).fill(false),
    });
  };

  // const playStop = (e) => {
  //   setPlaying(!isPlaying);
  //   !isPlaying
  //     ? e.target.classList.add("active")
  //     : e.target.classList.remove("active");
  // };

  return (
    <div className="drum-machine">
      <div className="bpm-value">
        <div className="drummer-transport">
          <div>
            <button
              className="button-browser"
              onClick={play}
              style={{ color: "orange" }}
            >
              <GrPlay />
            </button>
          </div>
          <div>
            <button
              className="button-browser"
              onClick={pause}
              style={{ color: "orange" }}
            >
              <IoMdPause />
            </button>
          </div>
          <div>
            <button
              className="button-browser"
              onClick={stop}
              style={{ color: "orange" }}
            >
              <VscDebugStop />
            </button>
          </div>
          <div>
            <button
              className="button-browser"
              onClick={handleDrums}
              style={{ color: "orange" }}
            >
              Reset
            </button>
          </div>

          <div>
            <button className="button-browser" style={{ color: "red" }}>
              REC
            </button>
          </div>
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <div className="drums-type">
          <form onSubmit={handleBpm}>
            <label style={{ color: "orange" }}>
              BPM: &nbsp;
              <input
                style={{ width: 45, height: 30, fontSize: 23 }}
                type="text"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
              />
            </label>
          </form>
        </div>
      </div>
      &nbsp;
      <div>
        {Object.keys(inputs).map((type, key) => (
          <div key={key} className="drums-container">
            <div className="drums-type">{type}</div>
            <div>
              {inputs[type].map((input, index) => (
                <input
                  className="checkbox"
                  type="checkbox"
                  key={index}
                  checked={input}
                  onChange={() => check(type, index)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
