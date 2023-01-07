import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isReady: Boolean = false;
  isRunning: Boolean = false;
  private ffmpeg;
  constructor() {
    this.ffmpeg = createFFmpeg({ log: true });
  }
  async init() {
    if (this.isReady) {
      return;
    }
    await this.ffmpeg.load();
    this.isReady = true;
  }

  async getScreenShoots(file: File) {
    this.isRunning = true;
    const data = await fetchFile(file);
    const seconds = ['01', '05', '10'];
    const commands: string[] = [];
    // get three screenshot from the video
    seconds.forEach((screen, i) => {
      commands.push(
        //input
        '-i',
        file.name,
        //output options
        '-ss',
        `00:00:${screen}`,
        '-frames:v',
        '1',
        '-filter:v',
        'scale=510:-1',
        //output
        `output_0${i + 1}.png`
      );
    });
    this.ffmpeg.FS('writeFile', file.name, data);
    await this.ffmpeg.run(...commands);
    //get url of three screens
    const screenShots: string[] = [];
    [1, 2, 3].forEach((item) => {
      const screenShotFile = this.ffmpeg.FS('readFile', `output_0${item}.png`);
      const screenShotBlob = new Blob([screenShotFile.buffer], {
        type: 'image/png',
      });
      const screenShotUrl = URL.createObjectURL(screenShotBlob);
      screenShots.push(screenShotUrl);
    });
    this.isRunning = false;
    return screenShots;
  }
}
