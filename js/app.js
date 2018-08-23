new Vue({
	el:'#app',
	data:{
		healthYou:100,
		healthMonster:100,
		isgame:false,
		turns:[],
		currentTurn:0
	},
	methods:{
		startNewGame:function(){
			this.isgame=true
			this.healthYou=100
			this.healthMonster=100
			this.turns=[]
		},
		attack:function(){
			var damage=this.calculateDamage(10,3)
			this.healthMonster-=damage
			this.turns.unshift({
				isPlayer:true,
				text: 'Player hit monster for '+damage+ ' hp',
				id:this.currentTurn+1
			})
			this.currentTurn++
			if(this.checkWin()){
				return
			}
			this.monsterAttack()
		},
		specialAttack:function(){
			var damage=this.calculateDamage(20,10)
			this.healthMonster-=damage
			this.turns.unshift({
				isPlayer:true,
				text:'Player hit monster hard for '+damage+ ' hp',
				id:this.currentTurn+1
			})
			this.currentTurn++
			if(this.checkWin()){
				return
			}
			this.monsterAttack()
		},
		heal:function(){
			var heal=Math.min(this.healthYou+10,100)-this.healthYou
			this.healthYou=Math.min(this.healthYou+10,100)
			this.turns.unshift({
				isPlayer:true,
				text:'Player was healed for '+heal+ ' hp',
				id: this.currentTurn + 1
			})
			this.currentTurn++
			this.monsterAttack()
		},
		monsterAttack:function(){
			var damage=this.calculateDamage(12,5)
			this.healthYou-=damage
			this.turns.unshift({
				isPlayer:false,
				text:'Monster dealt '+damage+ ' hp damage',
				id: this.currentTurn + 1
			})
			this.currentTurn++
			this.checkWin()
		},
		giveUp:function(){
			this.isgame=false
		},
		calculateDamage:function(min,max){
			return Math.max(Math.floor(Math.random()*12),5)
		},
		checkWin:function(){
			if(this.healthMonster<=0){
				if (confirm("You Won!New Game")){
					this.startNewGame()
				}else{
					this.isgame=false
				}
				return true
			}else if(this.healthYou<=0){
				if (confirm("You Lose!New Game")){
					this.startNewGame()
				}else{
					this.isgame=false
				}
				return true
			}
			return false
		}
	}
})
