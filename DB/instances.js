const Instances = {
  data: [
    {
      name: "Ragefire Chasm",
      tags: ["ragefeu", "rc"],
      lvl: [13, 18],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/3383/b622b19d-936e-4644-aa73-2160c9205959/9d2bbdf0eaaa1fa6829de8e3603f9af4.jpg"
    },
    {
      name: "Wailing Caverns",
      tags: ["lamentation", "wc"],
      lvl: [17, 24],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/3973/a619447f-c82e-4899-a8a4-1b6aff8fb0de/47d4111b23bf964a7a33bf6222c9c57b.jpg"
    },
    {
      name: "The Deadmines",
      tags: ["mortemine", "dm"],
      lvl: [17, 26],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4215/2934e833-75a5-474d-b545-917906f1f100/eb9ef9749009c772e959288b25f223a9.jpg"
    },
    {
      name: "Shadowfang Keep",
      tags: ["ombrecroc", "sk"],
      lvl: [22, 30],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4260/eb45a0e9-d41d-445b-a4ff-8bc0a8af04e0/028d8643746abc36efe9efe506bddbf2.jpg"
    },
    {
      name: "Blackfathom Deeps",
      tags: ["brassenoir", "bd"],
      lvl: [24, 32],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/3406/b0629871-cd38-4b07-b30f-14d1701dc8f5/69aaa968707d3fa8143222b715d6a99f.jpg"
    },
    {
      name: "The Stockade",
      tags: ["prison", "ts"],
      lvl: [24, 32],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4530/09afbd0d-a2ec-4451-bc6e-0a54f0ebc456/25e1a080dddf67aefefe8f5093ee83ed.jpg"
    },
    {
      name: "Gnomeregan",
      tags: ["gnomeregan", "gnom"],
      lvl: [29, 38],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4599/9e2c6842-b485-4eb7-a21c-c6ad6b44f2e7/bd13f923ad1d759ecc8d87c8a534cd31.jpg"
    },
    {
      name: "Razorfen Kraul",
      tags: ["kraal", "rk"],
      lvl: [29, 38],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4652/7f2c3419-001b-49ad-94d6-5f5555d5d775/c3e23c8055395f202b55a3a5892f53fd.jpg"
    },
    {
      name: "Scarlet Monastery",
      tags: ["mona", "sm"],
      lvl: [34, 45],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4705/f679302b-3434-416e-87ae-a92a5c4a1ed3/83cbd5866d54150aab21ec31aeb201c0.jpg"
    },
    {
      name: "Razorfen Downs",
      tags: ["gouffre", "rd"],
      lvl: [37, 46],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4893/ecb28c8d-468d-4f91-be30-f8fb972ff194/97646b7d9c8df8ccdef31b1012b54026.jpg"
    },
    {
      name: "Uldaman",
      tags: ["uldaman", "uld"],
      lvl: [41, 51],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4950/e1180543-9de9-410c-b4ea-f44a0549af26/f6bd7aad1071aaee26ee56759c875eb9.jpg"
    },
    {
      name: "Zul'Farrak",
      tags: ["zulfarak", "zf"],
      lvl: [42, 46],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/4996/082a7030-b7fb-4c46-982b-1282bee861e5/b750496d832082a9492070efd145c5ff.jpg"
    },
    {
      name: "Maraudon",
      tags: ["maraudon", "mar"],
      lvl: [46, 55],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/5113/3a9b433a-dc35-4038-b459-59324cf4306a/850ce6833b0728aa25be832cd1d90b32.png"
    },
    {
      name: "Temple of Atal'Hakkar",
      tags: ["atalhakkar", "tah"],
      lvl: [50, 56],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/5179/248b6505-9cca-4ff1-a86a-a692aa73401a/943f76b22a128e0d0d4ea7ed39175227.jpg"
    },
    {
      name: "Blackrock Depths",
      tags: ["blackrock", "brd"],
      lvl: [52, 60],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/5237/8b1ab564-45ff-4417-a7f4-edb4d388bf0e/8e2302a174fbdee1040a37c25d917940.jpg"
    },
    {
      name: "Lower Blackrock Spire",
      tags: ["lbrs"],
      lvl: [55, 60],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/5304/caa953ad-ab24-494c-82d7-52382783df6b/6fecc222f35ce4530dbf97d3a32675f0.jpg"
    },
    {
      name: "Upper Blackrock Spire",
      tags: ["ubrs"],
      lvl: [55, 60],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/5350/6c412920-5369-43e9-b01b-60316afc1277/1b4acc63153892628ad25708e00b2abf.jpg"
    },
    {
      name: "Dire Maul",
      tags: ["hache", "h3"],
      lvl: [55, 60],
      img:
        "https://gamepedia.cursecdn.com/wowpedia/e/e2/Dire_Maul_loading_screen.jpg"
    },
    {
      name: "Scholomance",
      tags: ["scholomance", "scholo"],
      lvl: [58, 60],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/6715/6da75d32-20e1-48e6-99b1-7008e28c91f6/2cd793dd7f2cef86fe1700b0757163e9.jpg"
    },
    {
      name: "Stratholme",
      tags: ["stratholme", "strat"],
      lvl: [58, 60],
      img:
        "https://www.wowisclassic.com/media/CACHE/images/contents/5421/37c2997d-a82e-4856-b965-d2ca98d307c2/cd29f541d265b6ac0ed5c50097bc863c.jpg"
    }
  ],
  listString: () => {
    const col = [30, 20];
    const separator = " ";
    return `\`\`\`Nom${new Array(col[0])
      .fill(separator, 0, col[0])
      .slice(3, col[0])
      .join("")}|Tags${new Array(col[1])
      .fill(separator, 0, col[1])
      .slice(4, col[1])
      .join("")}|Level\n${Instances.data
      .map(instance => {
        const name = `${instance.name}${new Array(col[0])
          .fill(separator, 0, col[0])
          .slice(instance.name.length, col[0])
          .join("")}|`;
        const tags = `${instance.tags.join(", ")}${new Array(col[1])
          .fill(separator, 0, col[1])
          .slice(instance.tags.join(", ").length, col[1])
          .join("")}|`;
        const lvl = `${instance.lvl.join("-")}`;

        return `${name}${tags}${lvl}`;
      })
      .join("\n")}\`\`\``;
  }
};

module.exports = Instances;