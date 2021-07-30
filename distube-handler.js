const Distube = require("distube");
const config = require("./config")
const ee = require("./JSON/embed_Config.json");
const { MessageEmbed } = require("discord.js");
const { format } = require("./function.js")
module.exports = (client) => {

  client.distube = new Distube(client, {
    searchSongs: false,
    emitNewSongOnly: false,
    highWaterMark: 1024*1024*64,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: false,
    youtubeCookie: 'GPS=1; YSC=oAUkOcMWu4c; VISITOR_INFO1_LIVE=zr_RB6Gn-L4; PREF=tz=Asia.Calcutta; SID=_gc7sHXEDZOgHbGt2CSiZ9c-EMClYdNVjDKmPkwbVWakHmroasGwZGA8SxgyD_7GSSzMLg.; __Secure-3PSID=_gc7sHXEDZOgHbGt2CSiZ9c-EMClYdNVjDKmPkwbVWakHmroep7QDri33skMGIL5w32VvQ.; HSID=AWfnx0F9L8PAhc0v8; SSID=AmMGddsC_4AwVYhBC; APISID=ZrfF42dJBcTv842Z/A6Vb74vR3CAsiQETL; SAPISID=AurMx9BeIeKOlPBa/AS-JHLksnWLVZkWp7; __Secure-3PAPISID=AurMx9BeIeKOlPBa/AS-JHLksnWLVZkWp7; LOGIN_INFO=AFmmF2swRQIgPRTHoNKeMWYuFW5UJEhNgH3o6cSygj1DWPC05xoXufcCIQDxGnyBVvXicodsb8_wApz4kcnkknjKuDM35846PQwyBw:QUQ3MjNmemRzamtlNUYzN2NTUW5DRjZ1LUFnTXRJb1RQT3I2TEx0VWVvWmQ3WXN5NWlZNXNiYTVVOXRWRG5wVGc1bXpuMzZGVG5xS0QyaV9HakZRTW9CNlp4c2h5Y1l1anVzZGUxZmpYOHRoYnNsR2t0cGROd245ZUFtZURSTGJhd1YxemlOeGg2cGE2am5xU1IxU1R0SnYwZVctOXVGdXZ3; SIDCC=AJi4QfHT68gmzqwWDTjWJD5o0dxsoaPs2BWY0gXRsuOFioLjv_tLPS40FsXOyve-yAhY1wvZ; __Secure-3PSIDCC=AJi4QfEDfTM8s2xzDpS2ty0v4ROxuytL3WCgLTdo7wMr9dcZtGIDKp7BPhK1nt5qmOAwDZRK',
    youtubeDL: true,
    updateYouTubeDL: true,
    customFilters: {
      "clear": "dynaudnorm=f=200",
      "bassboost": "bass=g=20,dynaudnorm=f=200",
      "8D": "apulsator=hz=0.08",
      "vaporwave": "aresample=48000,asetrate=48000*0.8",
      "nightcore": "aresample=48000,asetrate=48000*1.25",
      "phaser": "aphaser=in_gain=0.4",
      "tremolo": "tremolo",
      "vibrato": "vibrato=f=6.5",
      "reverse": "areverse",
      "treble": "treble=g=5",
      "normalizer": "dynaudnorm=f=200",
      "surrounding": "surround",
      "pulsator": "apulsator=hz=1",
      "subboost": "asubboost",
      "karaoke": "stereotools=mlev=0.03",
      "flanger": "flanger",
      "gate": "agate",
      "haas": "haas",
      "mcompand": "mcompand"
    }

  })

  // Queue status template
  const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

  // DisTube event listeners, more in the documentation page
  client.distube
      .on("playSong", (message, queue, song) => message.channel.send(new MessageEmbed()
        .setTitle("Playing :notes: " + song.name)
        .setURL(song.url)
        .setColor(ee.color)
        .addField("Duration", `\`${song.formattedDuration}\``)
        .addField("QueueStatus", status(queue))
        .setThumbnail(song.thumbnail)
        .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed()
          .setTitle("Added :thumbsup: " + song.name)
          .setURL(song.url)
          .setColor(ee.color)
          .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
          .addField("Duration", `\`${song.formattedDuration}\``)
          .setThumbnail(song.thumbnail)
          .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed()
            .setTitle("Playing Playlist :notes: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor(ee.color)
            .addField("Current Track: ", `[${song.name}](${song.url})`)
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("addList", (message, queue, playlist) => message.channel.send(new MessageEmbed()
            .setTitle("Added Playlist :thumbsup: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor(ee.color)
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration*1000)}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        )
      )
      .on("searchResult", (message, result) =>
          message.channel.send(new MessageEmbed()
                  .setTitle("**Choose an option from below**")
                  .setURL(song.url)
                  .setColor(ee.color)
                  .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
                  .setFooter(ee.footertext,ee.footericon)
          )
      )
      .on("searchCancel", (message) => message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | Search Cancelled`)
        )
      )
      .on("error", (message, e) => {
          console.log(String(e.stack).bgRed)
          message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.stack}\`\`\``)
          )
      })
      .on("initQueue", queue => {
          queue.autoplay = false;
          queue.volume = 100;
          queue.filter = "clear";
      }
    )

}
