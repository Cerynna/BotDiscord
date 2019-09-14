const Discord = require('discord.js');
const client = new Discord.Client();

const Instances = [{
    name: "Prison d'Hurlevent",
    tags: ['prison', 'psw']
  }, {
    name: "Profondeur de Brassenoire",
    tags: ['brassnoire', 'profondeur']
  }

]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  msg.content = msg.content.toLocaleLowerCase();
  if (msg.content.slice(0, 4) === '@cal') {
    let [action, ...command] = msg.content.slice(5, msg.content.length).split(' ')

    /* console.log(action, command); */

    switch (action) {
      case 'create':
        msg.channel.send('create');
        [instance, ...command] = command;
        if(findInstance(instance)){
          console.log(findInstance(instance))
        }
        break;

      default:
        msg.channel.send('???');
        break;
    }
  }




});

/* findInstance('prison');
findInstance('dfhfgh'); */

function findInstance(find) {
  let instanceFind = false;
  Instances.forEach((instance) => {
    let finder = 0
    instance.tags.forEach((tag) => {
      (tag === find) ? finder++ : '';
    })
    if (finder > 0) {
      instanceFind = instance;
    }
  })
  return instanceFind
}

client.login('NjIxODE1NDExODg4ODgxNzA0.XXq2sQ.FfUKsldn5CU9yH1ZN_Q0dikQsW8');