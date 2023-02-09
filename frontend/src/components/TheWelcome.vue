<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface KnightsList {
  age?: number;
  attack?: number;
  exp?: number;
  name: string;
  birthday: string;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  weapons: [
    {
      name: string;
      mod: number;
      attr: string;
      equipped: boolean;
    }
  ];
  keyAttribute: string;
}

export default defineComponent({
  name: "knights",
  data() {
    return {
      knightsList: [] as KnightsList[],
      fetchingFacts: false,
    };
  },
  methods: {
    async fetchKnights() {
      const knightsResponse = await axios.get<KnightsList[]>(
        "http://localhost:3000/knights"
      ); // Put this URL on .ENV file

      const knightsWithAttack = await this.calcAttack(knightsResponse?.data);
      const knightsWithAttackAndExp = await this.calcExp(knightsWithAttack);

      this.knightsList = knightsWithAttackAndExp;
    },

    async calcAttack(knightsList: KnightsList[]) {
      let arrayKnights: any = [];
      await knightsList.map(async (knight: KnightsList) => {
        let sumWeapons = 0;

        if (knight.weapons.length > 0) {
          knight.weapons.map((kni) =>
            kni.equipped ? (sumWeapons = sumWeapons + kni.mod) : undefined
          );

          const modKeyAttibute =
            knight?.attributes[
              knight.keyAttribute as keyof KnightsList["attributes"]
            ];

          // Calculate the mod Based on table in the PDF
          let modValue = -2;
          if (modKeyAttibute >= 0 && modKeyAttibute <= 8) {
            modValue = -2;
          } else if (modKeyAttibute >= 9 && modKeyAttibute <= 10) {
            modValue = -1;
          } else if (modKeyAttibute >= 11 && modKeyAttibute <= 12) {
            modValue = 0;
          } else if (modKeyAttibute >= 13 && modKeyAttibute <= 15) {
            modValue = 1;
          } else if (modKeyAttibute >= 16 && modKeyAttibute <= 18) {
            modValue = 2;
          } else if (modKeyAttibute >= 19 && modKeyAttibute <= 20) {
            modValue = 3;
          }

          const attack = 10 + modValue + sumWeapons;
          arrayKnights.push({ ...knight, attack });
        } else {
          arrayKnights.push({ ...knight })
        }
      });

      return arrayKnights;
    },

    async calcExp(knightsList: KnightsList[]) {
      let arrayKnights: any = [];
      await knightsList.map(async (knight: KnightsList) => {
        // TODO: Create other function to get this
        const age = await this._calculateAge(new Date(knight.birthday));

        const exp = Math.floor((age - 7) * Math.pow(22, 1.45));

        arrayKnights.push({ ...knight, exp, age });
      });

      return arrayKnights;
    },
    async _calculateAge(birthday: string) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  },
  async mounted() {
    await this.fetchKnights();
  },
});
</script>

<template>
  <table style="width:100%">
    <tr>
      <td>Nome</td>
      <td>Idade</td>
      <td>Armas</td>
      <td>Atributo</td>
      <td>Ataque</td>
      <td>EXP</td>
    </tr>
    <tr v-for="(knight, index) in knightsList" :key="index">
      <td>{{ knight?.name }}</td>
      <td>{{ knight.age }}</td>
      <td>{{ knight.weapons.length /*find(tes => tes.active ? sss++ : undefined)*/ }}</td>
      <td>{{ knight.keyAttribute }}</td>
      <td>{{ knight.attack }}</td>
      <td>{{ knight.exp }}</td>
    </tr>
  </table>
</template>
