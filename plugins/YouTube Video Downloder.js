/* Copyright (C) 2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsJulie - Yusuf Usta
*/

const Julie = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const config = require('../config');
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
const Heroku = require('heroku-client');
let onf = require('./sql/data/Configs');
let help = require('./sql/data/Helperes');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;
//============================== LYRICS =============================================
const axios = require('axios');
const { requestLyricsFor, requestAuthorFor, requestTitleFor, requestIconFor } = require("solenolyrics");
const solenolyrics= require("solenolyrics"); 
//============================== CURRENCY =============================================
const { exchangeRates } = require('exchange-rates-api');
const ExchangeRatesError = require('exchange-rates-api/src/exchange-rates-error.js')
//============================== TTS ==================================================
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-translate-tts');
//============================== YOUTUBE ==============================================
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');
//=====================================================================================
const Language = require('../language');
const Lang = Language.getString('scrapers');
const wiki = require('wikijs').default;
var gis = require('g-i-s');
const newLocal = "status@broadcast";

if (config.WORKTYPE = 'public') {

    Julie.addCommand({pattern: 'video ?(.*)', fromMe: false, desc: Lang.VIDEO_DESC}, (async (message, match) => { 

            if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text);    
        
            var VID = '';

            if (match[1].includes('/shorts')) {
                var tsts = '';
                if (match[1].includes('?feature')) {
                    var tsts = match[1].replace('?feature=share', '');
                }
                var alal = tsts.split('/')[4]
                VID = alal
            }
            else {
                try {
                    if (match[1].includes('/watch')) {
                        var tsts = match[1].replace('watch?v=', '')
                        var alal = tsts.split('/')[3]
                        VID = alal
                    } else {     
                        VID = match[1].split('/')[3]
                    }
                } catch {
                    return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
                }
            }
                        
            var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text, {quoted : {
                key: {
                fromMe: true,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
                },
                message: {
                "extendedTextMessage": {
                    "text": "*Dowloading*"
                }
                }
            }
            });
            var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
            yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));

            yt.on('end', async () => {
                reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text);
                await message.client.sendMessage(message.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4});
            });
        }));
}

Julie.addCommand({pattern: 'video ?(.*)', fromMe: true, desc: Lang.VIDEO_DESC, dontAddCommandlist: true}, (async (message, match) => { 

    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text);    

    var VID = '';

    if (match[1].includes('shorts')) {
        if (match[1].includes('feature')) {
            var tsts = match[1].replace('?feature=share', '');
        }
        var alal = tsts.split('/')[4]
        VID = alal
    }
    else {
        try {
            if (match[1].includes('watch')) {
                var tsts = match[1].replace('watch?v=', '')
                var alal = tsts.split('/')[3]
                VID = alal
            } else {     
                VID = match[1].split('/')[3]
            }
        } catch {
            return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
        }
    }
                
    var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text, {quoted : {
        key: {
        fromMe: true,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
        },
        message: {
        "extendedTextMessage": {
            "text": "*Dowloading*"
        }
        }
    }
    });
    var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
    yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));

    yt.on('end', async () => {
        reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text);
        await message.client.sendMessage(message.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4});
    });
}));
