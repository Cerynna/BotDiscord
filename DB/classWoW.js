const ClassWoW = {
    data: [
      {
        name: "druid",
        color: "#FF7D0A",
        spec: ["balance", "feral", "guardian", "restoration"]
      },
      {
        name: "hunter",
        color: "#ABD473",
        spec: ["beastmastery", "marksman", "survival"]
      },
      {
        name: "mage",
        color: "#69CCF0",
        spec: ["arcane", "fire", "frost"]
      },
      {
        name: "paladin",
        color: "#F58CBA",
        spec: ["holy", "protection", "retribution"]
      },
      {
        name: "priest",
        color: "#FFFFFF",
        spec: ["discipline", "holy", "shadow"]
      },
      {
        name: "rogue",
        color: "#FFF569",
        spec: ["assassination", "conbat", "subtlety"]
      },
      {
        name: "shaman",
        color: "#0070DE",
        spec: ["elemental", "enhancement", "restoration"]
      },
      {
        name: "warlock",
        color: "#9482C9",
        spec: ["affliction", "demonology", "destruction"]
      },
      {
        name: "warrior",
        color: "#C79C6E",
        spec: ["arms", "fury", "protection"]
      }
    ],
    findName: find => {
      return ClassWoW.data.find(classWoW => {
        return classWoW.name === find;
      });
    },
    listString: () => {
      const col = [10, 15];
      const separator = " ";
  
      return `\`\`\`Classe${new Array(col[0])
        .fill(separator, 0, col[0])
        .slice(6, col[0])
        .join("")}|Spec\n\n${ClassWoW.data
        .map(classWoW => {
          return `${classWoW.name}${new Array(col[0])
            .fill(separator, 0, col[0])
            .slice(classWoW.name.length, col[0])
            .join("")}|${classWoW.spec
            .map(spec => {
              return `${spec}${new Array(col[1])
                .fill(separator, 0, col[1])
                .slice(spec.length, col[1])
                .join("")}`;
            })
            .join("|")}`;
        })
        .join("\n")}\`\`\``;
    }
  };

  
  module.exports = ClassWoW;