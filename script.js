const homeScreen = document.getElementById("homeScreen");
const chatScreen = document.getElementById("chatScreen");
const modeButtons = document.querySelectorAll(".mode-btn");
const modeLabel = document.getElementById("modeLabel");
const initialAsukaMessage = document.getElementById("initialAsukaMessage");
const chatLog = document.getElementById("chatLog");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const backButton = document.getElementById("backButton");

const modeMessages = {
  "雑談モード": "何の話するの？ あんたの好きなことでいいわよ。",
  "問題整理モード": "結論から聞くわ。何に困ってるの？",
  "戦略思考モード": "いいわ。まず状況を整理する。目的は何？"
};

function switchToChat(mode) {
  modeLabel.textContent = mode;
  initialAsukaMessage.textContent = modeMessages[mode] || "どうしたの？";
  chatLog.innerHTML = `
    <div class="message asuka">
      <div class="bubble">
        <strong>アスカ：</strong>
        <span>${initialAsukaMessage.textContent}</span>
      </div>
    </div>
  `;

  homeScreen.classList.remove("active");
  chatScreen.classList.add("active");
  userInput.focus();
}

function switchToHome() {
  chatScreen.classList.remove("active");
  homeScreen.classList.add("active");
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;
    switchToChat(mode);
  });
});

backButton.addEventListener("click", switchToHome);

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;

  div.innerHTML = `
    <div class="bubble">
      <strong>${sender === "asuka" ? "アスカ" : "ユーザー"}：</strong>
      <span>${text}</span>
    </div>
  `;

  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);

  setTimeout(() => {
    addMessage("asuka", "ふん、いいわ。続けなさい。今は試作版だけど、ちゃんと形になってきてる。");
  }, 300);

  userInput.value = "";
});