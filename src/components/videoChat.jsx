import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../../firebase-config";

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callId, setCallId] = useState("");
  const [pc, setPc] = useState(null);
  const webcamRef = useRef(null);
  const remoteRef = useRef(null);
  const db = getFirestore(initializeApp(firebaseConfig)); // Initialize db here // maybe use useEffect

  useEffect(() => {
    const servers = {
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };

    setPc(new RTCPeerConnection(servers));

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  const handleWebcamButtonClick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (webcamRef.current) {
      webcamRef.current.srcObject = stream; // Corrected ref
    }
    setLocalStream(stream);
    setRemoteStream(new MediaStream());

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        if (remoteRef.current) {
          remoteRef.current.srcObject = event.streams[0];
        }
        remoteStream.addTrack(track);
      });
    };
  };

  const handleCallButtonClick = async () => {
    const callDocRef = doc(collection(db, "calls")); // Create ref with auto-ID
    const callDoc = doc(db, "calls", callDocRef.id);
    const offerCandidates = collection(
      db,
      "calls",
      callDoc.id,
      "offerCandidates",
    );
    const answerCandidates = collection(
      db,
      "calls",
      callDoc.id,
      "answerCandidates",
    );

    setCallId(callDocRef.id);

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDocRef, { offer });

    onSnapshot(callDocRef, (doc) => {
      const data = doc.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });
  };

  const handleAnswerButtonClick = async () => {
    const callDoc = doc(db, "calls", callId);
    const offerCandidates = collection(db, "calls", callId, "offerCandidates");
    const answerCandidates = collection(
      db,
      "calls",
      callId,
      "answerCandidates",
    );

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callDocSnap = await getDoc(callDoc);
    const callData = callDocSnap.data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  return (
    <div>
      <h2>1. Start your Webcam</h2>
      <div className="videos">
        <span>
          <h3>Local Stream</h3>
          <video
            id="webcamVideo"
            autoPlay
            playsInline
            ref={webcamRef}
          ></video>{" "}
          {/* Corrected ref */}
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video
            id="remoteVideo"
            autoPlay
            playsInline
            ref={remoteRef}
          ></video>{" "}
          {/* Corrected ref */}
        </span>
      </div>
      <button onClick={handleWebcamButtonClick} disabled={!!localStream}>
        Start webcam
      </button>

      <h2>2. Create a new Call</h2>
      <button onClick={handleCallButtonClick} disabled={!localStream}>
        Create Call (offer)
      </button>

      <h2>3. Join a Call</h2>
      <p>Answer the call from a different browser window or device</p>
      <input value={callId} onChange={(e) => setCallId(e.target.value)} />
      <button onClick={handleAnswerButtonClick} disabled={!callId}>
        Answer
      </button>

      <h2>4. Hangup</h2>
      <button disabled>Hangup</button>
    </div>
  );
};

export default VideoChat;
