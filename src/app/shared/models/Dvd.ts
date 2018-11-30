import { LibraryItem } from './LibraryItem';
import { Reader } from './Reader';
import { Injectable } from '@angular/core';
import { assign, extend } from 'lodash';

@Injectable()
export class Dvd extends LibraryItem {

    private audio: String[];
    private subtitles: String[];
    private producer: String;
    private actors: String[];

    constructor(ISBN: String, title: String, section: String, pubDate: Date,
        currentReader: Reader, borrowedOn: Date, audio: String[], subtitles: String[], producer: String, actors: String[]) {
        super(ISBN, title, section, pubDate, currentReader, borrowedOn);
        this.audio = audio;
        this.subtitles = subtitles;
        this.producer = producer;
        this.actors = actors;
    }

    static fromObject(object: Object): Dvd {
        return extend(new this(null, null, null, null, null, null, null, null, null, null), object);
    }

    public getAudio(): String[] {
        return this.audio;
    }

    public getSubtitles(): String[] {
        return this.subtitles;
    }

    public getProducer(): String {
        return this.producer;
    }

    public getActors(): String[] {
        return this.actors;
    }

    public setAudio(audio: String[]): void {
        this.audio = audio;
    }

    public setSubtitles(subtitles: String[]): void {
        this.subtitles = subtitles;
    }

    public setProducer(producer: String): void {
        this.producer = producer;
    }

    public setActors(actors: String[]): void {
        this.actors = actors;
    }

}
