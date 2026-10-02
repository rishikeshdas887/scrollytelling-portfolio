import http from "http";
import { spawn } from "child_process";
import fs from "fs";

async function run() {
  const chrome = spawn("google-chrome", [
    "--headless=new",
    "--disable-gpu",
    "--remote-debugging-port=9223",
    "--window-size=1440,900",
    "http://localhost:3000"
  ]);

  await new Promise(r => setTimeout(r, 3000));

  try {
    const listRes = await fetch("http://localhost:9223/json");
    const targets = await listRes.json();
    const page = targets.find(t => t.type === "page");
    if (!page) throw new Error("No page target");

    const WebSocket = (await import("ws")).default;
    const ws = new WebSocket(page.webSocketDebuggerUrl);

    await new Promise(res => ws.on("open", res));

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (data) => {
          const msg = JSON.parse(data.toString());
          if (msg.id === msgId) {
            ws.off("message", handler);
            resolve(msg.result);
          }
        };
        ws.on("message", handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    // Scroll to 30% (Section 2)
    await send("Runtime.evaluate", { expression: "window.scrollTo(0, window.innerHeight * 1.5);" });
    await new Promise(r => setTimeout(r, 600));
    let snap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/tmp/scroll_sec2.png", Buffer.from(snap.data, "base64"));
    console.log("Captured section 2");

    // Scroll to 60% (Section 3)
    await send("Runtime.evaluate", { expression: "window.scrollTo(0, window.innerHeight * 3.0);" });
    await new Promise(r => setTimeout(r, 600));
    snap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/tmp/scroll_sec3.png", Buffer.from(snap.data, "base64"));
    console.log("Captured section 3");

    // Scroll to Projects
    await send("Runtime.evaluate", { expression: "window.scrollTo(0, window.innerHeight * 5.2);" });
    await new Promise(r => setTimeout(r, 600));
    snap = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/tmp/scroll_projects.png", Buffer.from(snap.data, "base64"));
    console.log("Captured projects grid");

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}

run();
