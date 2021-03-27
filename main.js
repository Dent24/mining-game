Vue.component('skill-box', {
    template: `
        <div class="skill-box">
            <div class="skill-name">
                {{ skillname }}
            </div>
            <span>{{ skillpoint }}</span>
            <el-button type="success" @click="skillUpdate">+ 花費{{ skillpoint * 10 }}</el-button>
        </div>
    `,
    props: {
        skillclass: String,
        skillname: String,
        skillpoint: Number
    },
    methods: {
        skillUpdate() {
            this.$emit('update', this.skillclass);
        }
    }
})

var main = new Vue({
    el: '#main',
    data() {
        return {
            miningPoint: 0,
            skillTotal: 0,
            skillList: {
                effect: {
                    skillClass: 'effect',
                    skillName: '效率',
                    skillPoint: 1
                },
                autoPlay: {
                    skillClass: 'autoPlay',
                    skillName: '自動化',
                    skillPoint: 1
                },
                probability: {
                    skillClass: 'probability',
                    skillName: '幸運',
                    skillPoint: 1
                }
            },
            autoInterval: null
        }
    },
    mounted() {
        this.autoInterval = setInterval(() => {
            const random = Math.floor(Math.random() * Math.floor(100));
            if (random <= this.skillList.probability.skillPoint) {
                this.miningPoint += this.skillList.effect.skillPoint * (this.skillList.autoPlay.skillPoint - 1);
                this.skillTotal += this.skillList.effect.skillPoint * (this.skillList.autoPlay.skillPoint - 1);
            }
            this.miningPoint += this.skillList.effect.skillPoint * (this.skillList.autoPlay.skillPoint - 1);
            this.skillTotal += this.skillList.effect.skillPoint * (this.skillList.autoPlay.skillPoint - 1);
        }, 1000)
    },
    methods: {
        clickOnce() {
            const random = Math.floor(Math.random() * Math.floor(100));
            if (random <= this.skillList.probability.skillPoint) {
                this.miningPoint += this.skillList.effect.skillPoint;
                this.skillTotal += this.skillList.effect.skillPoint;
            }
            this.miningPoint += this.skillList.effect.skillPoint;
            this.skillTotal += this.skillList.effect.skillPoint;
        },
        skillUpdate(val) {
            if (this.skillTotal < this.skillList[val].skillPoint * 10) {
                return;
            }
            this.skillTotal -= this.skillList[val].skillPoint * 10;
            this.skillList[val].skillPoint += 1;
        }
    }
})