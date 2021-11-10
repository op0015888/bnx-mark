t.$store.state.armzContract.methods.getArmz(n).call({
              from: t.$store.state.address
}).then((function (e) {
t.$store.state.newItem = Object(o['a']) ({
              }, e),
              t.$store.commit('GET_COLLECTION'),
t.$store.commit('GET_BALANCE'),
              t.$store.commit('GET_INFOS')
})).catch((function () {
t.$store.state.loadingMode = void 0,
              t.$store.state.failedTransaction = !0
}))


function ce(e) {
      e.tokenContract.methods.balanceOf(e.accounts[0]).call({
        from: e.address
      }).then((function (t) {
        return e.balance = (t / 1000000000000000000).toFixed(2)
      })),
      e.web3.eth.getBalance(e.accounts[0]).then((function (t) {
        return e.bnbBalance = (t / 1000000000000000000).toFixed(2)
      }))
    }

    function le(e) {
      e.poolContract.methods.getInfos(e.address).call({
        from: e.address
      }).then((function (t) {
        var n = Date.now() / 1000 - t[1],
        a = Math.floor(n / 86400);
        e.rewardInfos = {
          waitingRewards: t[0],
          lastWithdraw: n,
          fees: 0 == t[1] || a > 15 ? 30 : 30 - 2 * a
        }
      }))
    }
eefe 21ac cd49
token amz pool
    function oe(e) {
      e.subLoading.collection = !0,
      e.armzContract.methods.balanceOf(e.address).call({
        from: e.address
      }).then((function (t) {
        var n = [
        ];
        if (e.collection = [
        ], parseInt(t)) for (var a = 0; a < t; a++) e.armzContract.methods.tokenOfOwnerByIndex(e.address, a).call({
          from: e.address
        }).then((function (a) {
          e.armzContract.methods.getArmz(a).call({
            from: e.address
          }).then((function (a) {
            n.push(Object(R['a']) ({
            }, a)),
            n.length == t && (e.collection = n.sort((function (e, t) {
              return t.rarity < e.rarity ? - 1 : 1
            })), e.subLoading.collection = !1)
          })).catch((function () {
            e.subLoading.collection = !1
          }))
        }));
         else e.subLoading.collection = !1
      })).catch((function (e) {
        console.log(e)
      }))
    }