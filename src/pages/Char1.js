import React, { useContext, useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { StoreContext } from "../App"

export default function Char1() {
  const { characterId } = useParams()
  const { userData } = useContext(StoreContext)
  const [characterStats, setCharacterStats] = useState(null)


  const getCharacterStats = useCallback(() => {
    console.log('im being called: characterStats')
    fetch(`https://www.bungie.net/Platform/Destiny2/${userData.membershipType}/Account/${userData.membershipId}/Character/${characterId}/Stats/?groups=1&components=201`, {
      method: 'GET',
      headers: {
        'x-api-key': '0e7bfa6649234f578fb0c6237ad41875'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.Response)
        setCharacterStats(data.Response)
        //console.log(characterStats)
      })
  }, [characterId, userData.membershipType, userData.membershipId]);

  useEffect(() => {
    getCharacterStats()
  }, [getCharacterStats])

  return (
    <div className='flex justify-around m-2 p-2'>
      <div className='border rounded-sm border-green-700 bg-gray-200 p-2'>
        <div className=' text-2xl'>PvP Stats</div>
        {characterStats === null ? ('Loading...') :
          (() => {
            return (
              <>
                <div>PvP Matches: {
                  characterStats.allPvP.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvP.allTime.activitiesEntered.basic.displayValue)
                }</div>
                <div>PvP Victories: {
                  characterStats.allPvP.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvP.allTime.activitiesWon.basic.displayValue)
                }</div>
                <div>PvP Kills: {
                  characterStats.allPvP.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvP.allTime.kills.basic.displayValue)
                }</div>
                <div>Time Wasted: {
                  characterStats.allPvP.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvP.allTime.secondsPlayed.basic.displayValue)
                }</div>
                <div>Average Lifespan: {
                  characterStats.allPvP.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvP.allTime.averageLifespan.basic.displayValue)
                }</div>
              </>)
          })()
        }
      </div>
      <div className='border rounded-sm border-green-700 bg-gray-200 p-2'>
        <div className='flex-row text-2xl'>
          PvE Stats
          </div>
        {characterStats === null ? ('Loading...') :
          (() => {
            return (
              <>
                <div>PvE Activities: {
                  characterStats.allPvE.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvE.allTime.activitiesEntered.basic.displayValue)
                }</div>
                <div>PvE Completions: {
                  characterStats.allPvE.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvE.allTime.activitiesCleared.basic.displayValue)
                }</div>
                <div>PvE Kills: {
                  characterStats.allPvE.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvE.allTime.kills.basic.displayValue)
                }</div>
                <div>Time Wasted: {
                  characterStats.allPvE.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvE.allTime.secondsPlayed.basic.displayValue)
                }</div>
                <div>Average Lifespan: {
                  characterStats.allPvE.allTime === undefined ?
                    ("None") :
                    (characterStats.allPvE.allTime.averageLifespan.basic.displayValue)
                }</div>
              </>)
          })()
        }
      </div>
    </div>
  )
}
