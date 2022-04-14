<template>
  <div class="reg_con">
    <dv-border-box-12 >
      <div class="banner">
         <div
              class="banner-item"
              :class="{ active: item.isActive }"
              v-for="(item, i) in banner"
              :key="i"
              @click="bannerClick(i)"
            >
              {{ item.name }}
            </div>
      </div>
      <div class="context">
            <div class="table-header">
              <div
                class="table-header-item"
                v-for="(item, i) in regForm.header"
                :key="i"
              >
                {{ item }}
              </div>
            </div>
            <div class="table-body">
              <div
                class="table-line"
                :style="{ background: oddEvenCheck(i) ? '#001951' : '' }"
                v-for="(line, i) in regForm.body"
                :key="i"
              >
                <div class="table-line-item" v-for="(item, n) in line" :key="n">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
    </dv-border-box-12>
  </div>
</template>
<script>
export default {
  data(){
    return{
      banner: [
        {
          name: 'PLC/PMC X',
          isActive: false,
        },
        {
          name: 'PLC/PMC Y',
          isActive: true,
        },
        {
          name: 'PLC/PMC R',
          isActive: false,
        },
      ],
         regForm: {
        header: ['地址', '二进制', '十六进制'],
        body: [
          ['Y0', '10000000', '0x81'],
          ['Y1', '10000001', '0x82'],
          ['Y3', '10000010', '0x83'],
          ['Y4', '10000011', '0x84'],
          ['Y5', '10000100', '0x85'],
          ['Y6', '10000101', '0x86'],
          ['Y7', '10000110', '0x87'],
          ['Y8', '10000111', '0x88'],
          ['Y8', '10001000', '0x89'],
          ['Y9', '10001001', '0x8a'],
          ['Y10', '10001010', '0x8b'],
          ['Y11', '10001011', '0x8c'],
        ],
      },
    }
  },
  mounted(){},
  methods:{
    bannerClick(){},
    oddEvenCheck(){}
  }
}
</script>
<style scoped lang="scss">
.reg_con{
  width: 100%;
  height: 552px;
  color: #fff;
  .banner{
    display: flex;
    flex-direction: row;
     .banner-item {
          flex: 1;
          line-height: 42px;
          margin: 10px 0 0 10px;
          text-align: center;
        }
        .active {
          background: #51d9d9;
        }
  }
    .context {
        height: 480px;
        margin: 8px 8px 41px 8px;
        .table-header {
          height: 42px;
          display: flex;
          flex-direction: row;
          font-size: 18px;
          background: #001951;
          .table-header-item {
            flex: 1;
            line-height: 42px;
            text-align: center;
          }
        }
        .table-body {
          overflow: auto;
          .table-line {
            height: 33px;
            display: flex;
            flex-direction: row;
            margin-top: 4px;
            font-size: 18px;
            .table-line-item {
              flex: 1;
              line-height: 33px;
              text-align: center;
            }
          }
        }
      }
}
</style>