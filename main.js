const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

var cron = require("node-cron");

// 40	Onyxia's Lair	(60+)
// 20	Zul'Gurub	(60+)
// 40	Molten Core	(60+)
// 40	Blackwing Lair	(60++)
// 20	Ruins of Ahn'Qiraj	(60++)
// 40	Temple of Ahn'Qiraj	(60+++)
// 40	Naxxramas	(60++++)

let config = JSON.parse(fs.readFileSync(`DB/config.json`, "utf8"));

cron.schedule("*/20 * * * *", () => {
  console.log("running a task every minute");
  // client.channels.get(config.channel).send(`Text`)
  // client.channels
  //   .get(config.channel)
  //   .fetchMessages()
  //   .then(
  //     function(list) {
  //       client.channels.get(config.channel).bulkDelete(list);
  //     },
  //     function(err) {
  //       client.channels
  //         .get(config.channel)
  //         .send("ERROR: ERROR CLEARING CHANNEL.");
  //     }
  //   );

  // client.channels.get(config.channel).send("Listes des Donjons");
  // listDJ().forEach(donjon => {
  //   if (embedDonjon(donjon)) {
  //     client.channels.get(config.channel).send(embedDonjon(donjon));
  //   }
  // });
});

const Instances = require("./DB/instances");

const ClassWoW = require("./DB/classWoW");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.author == client.user) {
    return;
  }
  fs.exists(`DB/users/${msg.author.id}.json`, exists => {
    if (!exists) {
      saveUser(msg.author.id, {
        id: msg.author.id,
        name: msg.author.username,
        class: null,
        spe: null,
        prevMess: "",
        nextMess: "",
        instance: "",
        roster: []
      });
    }
  });

  // msg.channel.send({embed: {
  //   color: 3447003,
  //   description: "A very simple Embed!"
  // }});
  // console.log(msg.channel.guild);
  // console.log(msg.author.id);
  // console.log(msg.author.username);
  // console.log(msg.author.toString());

  msg.content = msg.content.toLocaleLowerCase();

  if (!msg.channel.guild) {
    if (msg.content === "create") {
      let user = JSON.parse(
        fs.readFileSync(`DB/users/${msg.author.id}.json`, "utf8")
      );
      user.nextMess = "instance";
      user.prevMess = "create";
      saveUser(msg.author.id, user);
      msg.author.send(`Quel donjon veux tu planifié ?`);
      msg.author.send(Instances.listString());
    }

    if (findInstance(msg.content)) {
      const user = JSON.parse(
        fs.readFileSync(`DB/users/${msg.author.id}.json`, "utf8")
      );
      if (user.nextMess === "instance" && user.prevMess === "create") {
        msg.author.send(
          `Quand veux tu faire ${findInstance(msg.content).name} ?`
        );
        msg.author.send(`Format valide jj-mm-aaaa hh:mm`);
        const instance = {
          name: findInstance(msg.content),
          date: {
            create: Date.now(),
            close: "",
            planified: ""
          },
          author: { id: msg.author.id, name: msg.author.username },
          roster: [{ id: msg.author.id, name: msg.author.username }]
        };

        user.instance = instance;
        user.nextMess = "date";
        user.prevMess = "instance";
        saveUser(msg.author.id, user);
      }
    }

    if (findDate(msg.content)) {
      const user = JSON.parse(
        fs.readFileSync(`DB/users/${msg.author.id}.json`, "utf8")
      );
      if (user.nextMess === "date" && user.prevMess === "instance") {
        msg.author.send(`Votre donjon a été planifié`);
        // console.log(findDate(msg.content));
        user.instance.date.planified = findDate(msg.content);
        const idInstance = makeID();
        saveInstance(idInstance, user.instance);
        user.instance = "";
        // console.log(user);
        user.nextMess = "";
        user.prevMess = "";
        user.roster.push(idInstance);
        saveUser(msg.author.id, user);

        setTimeout(() => {
          ListDJEmbed(client);
        }, 1000);
      }
    }

    if (msg.content === "profil") {
      let user = JSON.parse(
        fs.readFileSync(`DB/users/${msg.author.id}.json`, "utf8")
      );
      msg.channel.send(embedProfil(user));

      if (user.class === null || user.spe === null) {
        msg.author.send(
          `Tu n'as pas remplis ton profil\nUtilise la commande :\n\`\`\`setprofil <class> <spec>\`\`\``
        );
      }
    }

    if (msg.content === "listclass") {
      msg.author.send(ClassWoW.listString());
    }

    if (msg.content.indexOf("setprofil") == 0) {
      let user = JSON.parse(
        fs.readFileSync(`DB/users/${msg.author.id}.json`, "utf8")
      );
      let command = msg.content.split(" ");
      if (ClassWoW.findName(command[1])) {
        if (ClassWoW.findName(command[1]).spec.indexOf(command[2]) >= 0) {
          user.class = command[1];
          user.spe = command[2];
          msg.channel.send(`Voici ton nouveau profil`);
          msg.channel.send(embedProfil(user));
        }
      } else {
        msg.channel.send(
          `Je ne comprend pas "${
            command[1]
          }"\nPour afficher la liste des classes/spec utilise la commande\`\`\`listclass\`\`\``
        );
      }
      saveUser(msg.author.id, user);
    }
  } else {
    if (msg.content.indexOf("!cal") == 0) {
      msg.delete();
      let command = msg.content.slice(5, msg.channel.length);

      if (command === "listdj") {
        ListDJEmbed(client);

        // client.channels.get(config.channel).send("Listes des Donjons");
        // listDJ().forEach(donjon => {
        //   let embed = embedDonjon(donjon);
        //   if (embed) {
        //     client.channels.get(config.channel).send(embed);
        //   }
        // });
      }
      if (command === "selectchannel") {
        config.channel = msg.channel.id;
        console.log(msg.channel);
        fs.writeFile(`DB/config.json`, JSON.stringify(config), err => {
          console.log(err);
        });
      }
      if (command === "clear") {
        msg.channel.fetchMessages().then(
          function(list) {
            msg.channel.bulkDelete(list);
          },
          function(err) {
            msg.channel.send("ERROR: ERROR CLEARING CHANNEL.");
          }
        );
      }
      if (command === "help") {
        msg.author.send(
          new Discord.RichEmbed()
            .setTitle("Liste des commandes")
            .setColor("#FFFFFF")
            .addField(
              "Sur le serveur ",
              `Liste des donjons\n\`\`\`!cal listdj\`\`\`\nNettoyer le canal\n\`\`\`!cal clear\`\`\`\nliste des commandes\n\`\`\`!cal help\`\`\`\nRejoindre un groupe\`\`\`!cal join <idgroup>\`\`\``,
              true
            )
            .addField(
              "En message privé ",
              `Crée un nouveau donjon\`\`\`create\`\`\`\nAfficher son profil\`\`\`profil\`\`\`\nEditer son profil\`\`\`setprofil <class> <spec>\`\`\`\nListe des classes/spec\`\`\`listclass\`\`\``,
              true
            )
            .addBlankField(true)
        );
      }

      if (command.indexOf("join") >= 0) {
        let idGroup = command.split(" ").pop();
        AddInGroup(idGroup, { id: msg.author.id, name: msg.author.username });
        // setTimeout(() => {
        //   ListDJEmbed(client);
        // }, 100);
      }

      if (command.indexOf("leave" >= 0)) {
        let idGroup = command.split(" ").pop();
        RemoveInGroup(idGroup, {
          id: msg.author.id,
          name: msg.author.username
        });
        // setTimeout(() => {
        //   ListDJEmbed(client);
        // }, 100);
      }
    }
  }
});

function findInstance(find) {
  let instanceFind = false;
  Instances.data.forEach(instance => {
    let finder = 0;
    instance.tags.forEach(tag => {
      tag === find ? finder++ : "";
    });
    if (finder > 0) {
      instanceFind = instance;
    }
  });
  return instanceFind;
}

function AddInGroup(id, user) {
  fs.exists(`DB/instances/${id}.json`, exists => {
    if (exists) {
      let group = JSON.parse(
        fs.readFileSync(`DB/instances/${id}.json`, "utf8")
      );
      if (
        !group.roster.find(roster => {
          return roster.id === user.id;
        })
      ) {
        group.roster.push(user);
        console.log(group);
        // saveInstance(id, group);
        setTimeout(() => {
          saveInstance(id, group);
        }, 100);

        setTimeout(()=>{
          ListDJEmbed(client) 
        },200)
      }
    }
  });
}

function RemoveInGroup(id, user) {
  fs.exists(`DB/instances/${id}.json`, exists => {
    if (exists) {
      let group = JSON.parse(
        fs.readFileSync(`DB/instances/${id}.json`, "utf8")
      );

      if (
        group.roster.find(roster => {
          return roster.id === user.id;
        })
      ) {
        let newRoster = group.roster.filter(roster => {
          return roster.id !== user.id;
        });
        group.roster = newRoster;
        console.log(group);

        setTimeout(() => {
          saveInstance(id, group);
        }, 100);
        setTimeout(()=>{
          ListDJEmbed(client) 
        },200)
      }
    }
  });
}

function findDate(find) {
  let regex = /^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d$/g;
  const shortcut = ["aujourd'hui", "maintenant", "now"];
  if (find.match(regex)) {
    let date = find.split(" ")[0].split("-");
    let time = find.split(" ")[1] + ":00";
    let dateJS = `${date[2]}-${date[1]}-${date[0]} ${time}`;
    return new Date(dateJS).getTime();
  } else if (shortcut.indexOf(find) >= 0) {
    console.log("SHORTCUT");
    return Date.now() + 1000 * 60 * 30;
  } else {
    return false;
  }
}
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

function saveUser(author, data) {
  fs.writeFile(`DB/users/${author}.json`, JSON.stringify(data), err => {
    console.log(err);
  });
}

function saveInstance(id, data) {
  fs.writeFile(`DB/instances/${id}.json`, JSON.stringify(data), err => {
    console.log(err);
  });
}
function deleteInstance(id) {
  fs.unlinkSync(`DB/instances/${id}.json`);
}

function makeID() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}
function listDJ() {
  return fs
    .readdirSync("DB/instances/")
    .map(item => {
      return {
        id: item.replace(".json", ""),
        data: JSON.parse(fs.readFileSync(`DB/instances/${item}`, "utf8"))
      };
    })
    .sort((a, b) => {
      let order = "asc";
      // console.log(a.data.date.planified, b.data.date.planified);
      let comparison = 0;
      if (a.data.date.planified > b.data.date.planified) {
        comparison = 1;
      } else if (a.data.date.planified < b.data.date.planified) {
        comparison = -1;
      }
      return order == "desc" ? comparison * -1 : comparison;
    });
}

function embedProfil(user) {
  return new Discord.RichEmbed()
    .setColor(
      user.class != null ? ClassWoW.findName(user.class).color : "#FFFFFF"
    )
    .setAuthor(
      user.name,
      `https://github.com/orourkek/Wow-Icons/blob/master/images/spec/${user.class}/${user.spe}.png?raw=true`
    )
    .setDescription("Some description here")
    .setThumbnail(
      `https://github.com/orourkek/Wow-Icons/blob/master/images/crests/${user.class}.png?raw=true`
    )
    .addBlankField()
    .addField("In roster", "Some value here", true);
}

function embedDonjon(donjon) {
  let diff = donjon.data.date.planified - Date.now();
  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const img = donjon.data.name.img
    ? donjon.data.name.img
    : "https://www.mamytwink.com/upload/news/2018/septembre/26/wow-classic-billet-virtuel-blizzcon-2018-wow.jpg";
  if (diff > 1000 * 60) {
    let roster = donjon.data.roster.map(roster => {
      let user = JSON.parse(
        fs.readFileSync(`DB/users/${roster.id}.json`, "utf8")
      );
      // return `${user.class} | ${user.spe} | ${roster.name}\n`;
      return `${client.emojis.find(emoji => emoji.name === user.class)} ${client.emojis.find(emoji => emoji.name === user.spe)} ${user.name}`;
    }).join("\n");
    return new Discord.RichEmbed()
      .setTitle(
        `${donjon.data.name.name} - (${donjon.data.name.lvl.join(" - ")})`
      )
      .setColor("#FFFFFF")
      .setThumbnail(`${img}`)
      .setDescription(
        `dans ${days > 0 ? `${days} jours` : ""} ${
          hours > 0 ? `${hours} heures` : ""
        } ${minutes > 0 ? `${minutes} minutes` : ""}\nle ${timeConverter(
          donjon.data.date.planified
        )}`
      )
      .addField("Chef du groupe", `${donjon.data.author.name}`, true)
      .addField(`Membres du groupe `, `${roster}`, true)
      .addBlankField(true)
      .addField(
        "Rejoindre le groupe",
        `\`\`\`!cal join ${donjon.id}\`\`\``,
        false
      )
      .addField(
        "Quiter le groupe",
        `\`\`\`!cal leave ${donjon.id}\`\`\``,
        false
      );
  } else {
    deleteInstance(donjon.id);
    return false;
  }
}

function ListDJEmbed(client) {
  clearChannel(client);
  client.channels.get(config.channel).send("Listes des Donjons");
  listDJ().forEach(donjon => {
    let embed = embedDonjon(donjon);
    if (embed) {
      client.channels.get(config.channel).send(embed);

      // setTimeout(()=>{
      //   embed.title = "LOL"
      // },5000)
    }
  });
}

function clearChannel(client) {
  client.channels
    .get(config.channel)
    .fetchMessages()
    .then(
      function(list) {
        client.channels.get(config.channel).bulkDelete(list);
      },
      function(err) {
        client.channels
          .get(config.channel)
          .send("ERROR: ERROR CLEARING CHANNEL.");
      }
    );
}

client.login("NjIxODE1NDExODg4ODgxNzA0.XX2Oeg.TDODqOBqPtGicBkLOc9QVl6h_w0");
