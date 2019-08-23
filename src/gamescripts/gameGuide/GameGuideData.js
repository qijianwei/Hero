export default {
	"role": {
		"addAllRate": 1.0,
		"addMpRate": 0.0,
		"addStrengthRate": 0.0,
		"addWeaponSkillProb": 10,
		"downWeaponCd": 10,
		"downWeaponConsume": 0,
		"hitRecoveMp": 0,
		"notCrit": 0,
		"notDizzy": 0,
		"notFrozen": 0,
		"notPalsy": 0,
		"notPoison": 1,
		"reboundRate": 0,
		"recoverHp": 0,
		"recoverMp": 1.0,
		"refiners": [{
				"currentExp": 0,
				"currentFullExp": 0,
				"id": "refiner_09",
				"refinerBasics": {
					"show": 3,
					"weaponType": 1,
					"hurt": 1.03
				},
				"refinerDesc": "提升轻型兵器伤害。",
				"refinerEachUp": 0.03,
				"refinerEffect": "轻型兵器伤害增加d%",
				"refinerLevel": 1,
				"refinerName": "轻燕",
				"refinerType": 1,
				"refinerUnlock": 0,
				"status": 0,
				"type": 1
			},
			{
				"currentExp": 0,
				"currentFullExp": 0,
				"id": "refiner_10",
				"refinerBasics": {
					"show": 3,
					"weaponType": 2,
					"hurt": 1.03
				},
				"refinerDesc": "提升中型兵器伤害。",
				"refinerEachUp": 0.03,
				"refinerEffect": "中型兵器伤害增加d%",
				"refinerLevel": 1,
				"refinerName": "锋刃",
				"refinerType": 1,
				"refinerUnlock": 0,
				"status": 0,
				"type": 1
			},
			{
				"currentExp": 0,
				"currentFullExp": 0,
				"id": "refiner_11",
				"refinerBasics": {
					"show": 3,
					"weaponType": 3,
					"hurt": 1.03
				},
				"refinerDesc": "提升重型兵器伤害。",
				"refinerEachUp": 0.03,
				"refinerEffect": "重型兵器伤害增加d%",
				"refinerLevel": 1,
				"refinerName": "沉石",
				"refinerType": 1,
				"refinerUnlock": 0,
				"status": 0,
				"type": 1
			}
		],
		"roleBone": 126,
		"roleCritHarm": 180,
		"roleCritProb": 19,
		"roleDesc": "飞刀",
		"roleDress": "hero_1",
		"roleHp": 1110,
		"roleIcon": "xxx",
		"roleId": 1,
		"roleLevel": 20,
		"roleMp": 259,
		"roleName": "阿强",
		"rolePrice": 0,
		"roleSkills": "31,32,33",
		"roleStar": 2,
		"roleStatus": 0,
		"roleStrength": 377,
		"roleTopLevel": 20,
		"roleType": 0,
		"roleUpBone": 5,
		"roleUpHp": 42,
		"roleUpMp": 10,
		"roleUpStrength": 15,
		"skillWeapon": {
			"exp": 0,
			"num": 0,
			"skills": [{
				"skillCd": 0.0,
				"skillConfig": {
					"critProb": 20
				},
				"skillDesc": "发出1把火焰飞刀，造成臂力*0.18倍伤害。技能暴击+20%。",
				"skillId": 88,
				"skillLevel": 1,
				"skillName": "酒灼刀",
				"skillProb": 100,
				"skillType": 1,
				"skillUnlock": 0,
				"status": 0
			}],
			"weaponAttack": 67.0,
			"weaponCd": 0.0,
			"weaponConsume": 0.2,
			"weaponDurable": 20,
			"weaponIcon": "3",
			"weaponId": "x001_4",
			"weaponName": "火焰飞刀",
			"weaponPrice": 0,
			"weaponSalePrice": 0,
			"weaponSkills": "88",
			"weaponStar": 4,
			"weaponTopLevel": 15,
			"weaponType": 1
		},
		"skills": [{
				"skillCd": 20.0,
				"skillConfig": {
					"weaponId": "x001_4",
					"critProb": 20
				},
				"skillConsume": 0.0,
				"skillDesc": "发出1把火焰飞刀，造成臂力*0.18倍伤害。技能暴击+20%。",
				"skillId": 31,
				"skillLevel": 1,
				"skillName": "酒灼刀",
				"skillProb": 100,
				"skillType": 1,
				"skillUnlock": 5,
				"status": 1
			},
			{
				"skillCd": 0.0,
				"skillConfig": {
					"critHarm": 20,
					"hurt": 0.2
				},
				"skillConsume": 0.0,
				"skillDesc": "所有轻型兵器伤害+20%。暴击伤害+20%。",
				"skillId": 32,
				"skillLevel": 1,
				"skillName": "江湖老油条",
				"skillProb": 12,
				"skillType": 0,
				"skillUnlock": 10,
				"status": 1
			},
			{
				"skillCd": 60.0,
				"skillConfig": {
					"weaponCd": 0,
					"time": 10
				},
				"skillConsume": 0.0,
				"skillDesc": "所有兵器无冷却时间，持续10秒。",
				"skillId": 33,
				"skillLevel": 1,
				"skillName": "夺命连环三仙剑",
				"skillProb": 100,
				"skillType": 1,
				"skillUnlock": 15,
				"status": 1
			}
		],
		"upgradeCost": 0
	},
	"weaponList": [{
			"exp": 0,
			"num": 0,
			"skills": [{
					"skillCd": 0.0,
					"skillConfig": {
						"hurt": 5
					},
					"skillDesc": "造成5倍伤害",
					"skillId": 48,
					"skillLevel": 1,
					"skillName": "诛心",
					"skillProb": 18,
					"skillType": 1,
					"skillUnlock": 0,
					"status": 0
				},
				{
					"skillCd": 0.0,
					"skillConfig": {
						"critHarm": 20,
						"critProb": 5
					},
					"skillDesc": "暴击+5%，暴伤+20% ",
					"skillId": 65,
					"skillLevel": 1,
					"skillName": "灵猴",
					"skillProb": 100,
					"skillType": 0,
					"skillUnlock": 0,
					"status": 1
				}
			],
			"upgradeCost": 0,
			"weaponAttack": 190.0,
			"weaponCd": 2.0,
			"weaponConsume": 91.0,
			"weaponDownConsume": 27,
			"weaponDurable": 22,
			"weaponIcon": "xxxxx",
			"weaponId": "d015_3",
			"weaponLevel": 15,
			"weaponName": "小李飞刀",
			"weaponPrice": 30000,
			"weaponSalePrice": 6000,
			"weaponSkills": "48,65",
			"weaponStar": 3,
			"weaponTopLevel": 15,
			"weaponType": 1,
			"weaponUpAttack": 70,
			"weaponUpDurable": 10
		},
		{
			"exp": 0,
			"num": 0,
			"skills": [{
					"skillCd": 0.0,
					"skillConfig": {
						"recoverDown": "5-0.4"
					},
					"skillDesc": "使对手内力恢复速度-60%，持续5秒",
					"skillId": 55,
					"skillLevel": 1,
					"skillName": "气绝",
					"skillProb": 22,
					"skillType": 1,
					"skillUnlock": 0,
					"status": 1
				},
				{
					"skillCd": 0.0,
					"skillConfig": {
						"downConsume": 10
					},
					"skillDesc": "所有兵器内力消耗-10%",
					"skillId": 80,
					"skillLevel": 1,
					"skillName": "轮回",
					"skillProb": 100,
					"skillType": 0,
					"skillUnlock": 0,
					"status": 1
				}
			],
			"upgradeCost": 0,
			"weaponAttack": 242.0,
			"weaponCd": 3.0,
			"weaponConsume": 72.0,
			"weaponDownConsume": 36,
			"weaponDurable": 25,
			"weaponIcon": "xxxx",
			"weaponId": "z015_3",
			"weaponLevel": 15,
			"weaponName": "倚天",
			"weaponPrice": 20000,
			"weaponSalePrice": 4000,
			"weaponSkills": "55,80",
			"weaponStar": 3,
			"weaponTopLevel": 15,
			"weaponType": 2,
			"weaponUpAttack": 97,
			"weaponUpDurable": 10
		},
		{
			"exp": 0,
			"num": 0,
			"skills": [{
					"skillCd": 0.0,
					"skillConfig": {
						"cd": 0
					},
					"skillDesc": "兵器立即冷却",
					"skillId": 58,
					"skillLevel": 1,
					"skillName": "顿悟",
					"skillProb": 25,
					"skillType": 1,
					"skillUnlock": 0,
					"status": 1
				},
				{
					"skillCd": 0.0,
					"skillConfig": {
						"allWeaponSkillProb": 10
					},
					"skillDesc": "所有兵器技能触发几率提升10%",
					"skillId": 87,
					"skillLevel": 1,
					"skillName": "剑圣",
					"skillProb": 100,
					"skillType": 0,
					"skillUnlock": 0,
					"status": 1
				}
			],
			"upgradeCost": 0,
			"weaponAttack": 456.0,
			"weaponCd": 4.0,
			"weaponConsume": 126.0,
			"weaponDownConsume": 50,
			"weaponDurable": 25,
			"weaponIcon": "xxxxx",
			"weaponId": "g015_3",
			"weaponLevel": 15,
			"weaponName": "紫金降魔杵",
			"weaponPrice": 30000,
			"weaponSalePrice": 6000,
			"weaponSkills": "58,87",
			"weaponStar": 3,
			"weaponTopLevel": 15,
			"weaponType": 3,
			"weaponUpAttack": 256,
			"weaponUpDurable": 10
		},
		{
			"exp": 0,
			"num": 0,
			"skills": [{
					"skillCd": 0.0,
					"skillConfig": {
						"poison": "6-210"
					},
					"skillDesc": "使对手中剧毒，6秒损失210点生命",
					"skillId": 46,
					"skillLevel": 1,
					"skillName": "奇毒",
					"skillProb": 25,
					"skillType": 1,
					"skillUnlock": 0,
					"status": 1
				},
				{
					"skillCd": 0.0,
					"skillConfig": {
						"notPoison": 1
					},
					"skillDesc": "免疫中毒",
					"skillId": 83,
					"skillLevel": 1,
					"skillName": "药师",
					"skillProb": 100,
					"skillType": 0,
					"skillUnlock": 0,
					"status": 1
				}
			],
			"upgradeCost": 0,
			"weaponAttack": 185.0,
			"weaponCd": 2.0,
			"weaponConsume": 81.0,
			"weaponDownConsume": 27,
			"weaponDurable": 25,
			"weaponIcon": "xxxxx",
			"weaponId": "d014_3",
			"weaponLevel": 15,
			"weaponName": "绝命",
			"weaponPrice": 25000,
			"weaponSalePrice": 5000,
			"weaponSkills": "46,83",
			"weaponStar": 3,
			"weaponTopLevel": 15,
			"weaponType": 1,
			"weaponUpAttack": 70,
			"weaponUpDurable": 10
		},
		{
			"exp": 0,
			"num": 0,
			"skills": [{
					"skillCd": 0.0,
					"skillConfig": {
						"weaponNum": 3
					},
					"skillDesc": "发出3件兵器",
					"skillId": 44,
					"skillLevel": 1,
					"skillName": "影刃",
					"skillProb": 22,
					"skillType": 1,
					"skillUnlock": 0,
					"status": 1
				},
				{
					"skillCd": 0.0,
					"skillConfig": {
						"downCd": 10
					},
					"skillDesc": "所有兵器冷却时间-10%",
					"skillId": 82,
					"skillLevel": 1,
					"skillName": "剑豪",
					"skillProb": 100,
					"skillType": 0,
					"skillUnlock": 0,
					"status": 1
				}
			],
			"upgradeCost": 0,
			"weaponAttack": 180.0,
			"weaponCd": 2.0,
			"weaponConsume": 86.0,
			"weaponDownConsume": 27,
			"weaponDurable": 25,
			"weaponIcon": "xxxxx",
			"weaponId": "d013_3",
			"weaponLevel": 15,
			"weaponName": "七星",
			"weaponPrice": 20000,
			"weaponSalePrice": 4000,
			"weaponSkills": "44,82",
			"weaponStar": 3,
			"weaponTopLevel": 15,
			"weaponType": 1,
			"weaponUpAttack": 70,
			"weaponUpDurable": 10
		}
	],
	"robotWeaponList": [{
			"exp": 0,
			"num": 0,
			"skills": [{
					"skillCd": 0.0,
					"skillConfig": {
						"recoverDown": "5-0.4"
					},
					"skillDesc": "使对手内力恢复速度-60%，持续5秒",
					"skillId": 55,
					"skillLevel": 1,
					"skillName": "气绝",
					"skillProb": 22,
					"skillType": 1,
					"skillUnlock": 0,
					"status": 1
				},
				{
					"skillCd": 0.0,
					"skillConfig": {
						"downConsume": 10
					},
					"skillDesc": "所有兵器内力消耗-10%",
					"skillId": 80,
					"skillLevel": 1,
					"skillName": "轮回",
					"skillProb": 100,
					"skillType": 0,
					"skillUnlock": 0,
					"status": 1
				}
			],
			"upgradeCost": 0,
			"weaponAttack": 242.0,
			"weaponCd": 2.9,
			"weaponConsume": 72.0,
			"weaponDownConsume": 36,
			"weaponDurable": 25,
			"weaponIcon": "xxxx",
			"weaponId": "z015_3",
			"weaponLevel": 15,
			"weaponName": "倚天",
			"weaponPrice": 20000,
			"weaponSalePrice": 4000,
			"weaponSkills": "55,80",
			"weaponStar": 3,
			"weaponTopLevel": 15,
			"weaponType": 2,
			"weaponUpAttack": 97,
			"weaponUpDurable": 10
		},
		{
			"exp": 0,
			"num": 0,
			"skills": [{
					"skillCd": 0.0,
					"skillConfig": {
						"cd": 0
					},
					"skillDesc": "兵器立即冷却",
					"skillId": 58,
					"skillLevel": 1,
					"skillName": "顿悟",
					"skillProb": 25,
					"skillType": 1,
					"skillUnlock": 0,
					"status": 1
				},
				{
					"skillCd": 0.0,
					"skillConfig": {
						"allWeaponSkillProb": 10
					},
					"skillDesc": "所有兵器技能触发几率提升10%",
					"skillId": 87,
					"skillLevel": 1,
					"skillName": "剑圣",
					"skillProb": 100,
					"skillType": 0,
					"skillUnlock": 0,
					"status": 1
				}
			],
			"upgradeCost": 0,
			"weaponAttack": 456.0,
			"weaponCd": 4.0,
			"weaponConsume": 126.0,
			"weaponDownConsume": 50,
			"weaponDurable": 25,
			"weaponIcon": "xxxxx",
			"weaponId": "g015_3",
			"weaponLevel": 15,
			"weaponName": "紫金降魔杵",
			"weaponPrice": 30000,
			"weaponSalePrice": 6000,
			"weaponSkills": "58,87",
			"weaponStar": 3,
			"weaponTopLevel": 15,
			"weaponType": 3,
			"weaponUpAttack": 256,
			"weaponUpDurable": 10
		}
	],
	"robotRole": {
		"addAllRate": 1.0,
		"addMpRate": 0.0,
		"addStrengthRate": 0.0,
		"addWeaponSkillProb": 10,
		"downWeaponCd": 0,
		"downWeaponConsume": 0,
		"hitRecoveMp": 0,
		"notCrit": 1,
		"notDizzy": 0,
		"notFrozen": 0,
		"notPalsy": 0,
		"notPoison": 0,
		"reboundRate": 20,
		"recoverHp": 0,
		"recoverMp": 1.0,
		"refiners": [{
				"currentExp": 0,
				"currentFullExp": 0,
				"id": "refiner_09",
				"refinerBasics": {
					"show": 3,
					"weaponType": 1,
					"hurt": 1.03
				},
				"refinerDesc": "提升轻型兵器伤害。",
				"refinerEachUp": 0.03,
				"refinerEffect": "轻型兵器伤害增加d%",
				"refinerLevel": 1,
				"refinerName": "轻燕",
				"refinerType": 1,
				"refinerUnlock": 0,
				"status": 0,
				"type": 1
			},
			{
				"currentExp": 0,
				"currentFullExp": 0,
				"id": "refiner_10",
				"refinerBasics": {
					"show": 3,
					"weaponType": 2,
					"hurt": 1.03
				},
				"refinerDesc": "提升中型兵器伤害。",
				"refinerEachUp": 0.03,
				"refinerEffect": "中型兵器伤害增加d%",
				"refinerLevel": 1,
				"refinerName": "锋刃",
				"refinerType": 1,
				"refinerUnlock": 0,
				"status": 0,
				"type": 1
			},
			{
				"currentExp": 0,
				"currentFullExp": 0,
				"id": "refiner_11",
				"refinerBasics": {
					"show": 3,
					"weaponType": 3,
					"hurt": 1.03
				},
				"refinerDesc": "提升重型兵器伤害。",
				"refinerEachUp": 0.03,
				"refinerEffect": "重型兵器伤害增加d%",
				"refinerLevel": 1,
				"refinerName": "沉石",
				"refinerType": 1,
				"refinerUnlock": 0,
				"status": 0,
				"type": 1
			}
		],
		"roleBone": 176,
		"roleCritHarm": 180,
		"roleCritProb": 4,
		"roleDesc": "反击",
		"roleDress": "hero_4",
		"roleHp": 1660,
		"roleIcon": "xxx",
		"roleId": 4,
		"roleLevel": 20,
		"roleMp": 238,
		"roleName": "乔帮主",
		"rolePrice": 0,
		"roleSkills": "40,41,42",
		"roleStar": 4,
		"roleStatus": 0,
		"roleStrength": 574,
		"roleTopLevel": 20,
		"roleType": 0,
		"roleUpBone": 7,
		"roleUpHp": 64,
		"roleUpMp": 9,
		"roleUpStrength": 23,
		"skills": [{
				"skillCd": 24.0,
				"skillConfig": {
					"hurt": 0.2,
					"dragon": 1
				},
				"skillConsume": 0.0,
				"skillDesc": "打出1条小金龙，造成臂力*0.2倍伤害。",
				"skillId": 40,
				"skillLevel": 1,
				"skillName": "苍龙再现",
				"skillProb": 100,
				"skillType": 1,
				"skillUnlock": 5,
				"status": 1
			},
			{
				"skillCd": 0.0,
				"skillConfig": {
					"reboundRate": 20,
					"notCrit": 1
				},
				"skillConsume": 0.0,
				"skillDesc": "20%反弹对手的兵器。不会受到暴击。",
				"skillId": 41,
				"skillLevel": 1,
				"skillName": "游龙入水",
				"skillProb": 100,
				"skillType": 0,
				"skillUnlock": 10,
				"status": 1
			},
			{
				"skillCd": 75.0,
				"skillConfig": {
					"dizziness": 3,
					"dragon": 2,
					"hurt": 0.42
				},
				"skillConsume": 0.0,
				"skillDesc": "打出2条金龙，造成臂力*0.42倍伤害，命中后使对手晕眩3秒。",
				"skillId": 42,
				"skillLevel": 1,
				"skillName": "亢龙有悔",
				"skillProb": 100,
				"skillType": 1,
				"skillUnlock": 15,
				"status": 1
			}
		],
		"upgradeCost": 0
	}
}