import React, { useContext, useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { StoreContext, ReducerContext } from '../App.js'
import Error from "../pages/Error.js"

export default function Search() {
  const [text, setText] = useState('')
  // const [charIds, setCharIds] = useState([])
  const { userData } = useContext(StoreContext)
  const { userDataDispatch } = useContext(ReducerContext)
  const { charIdData } = useContext(StoreContext)
  const { charIdDispatch } = useContext(ReducerContext)
  const { charInfo } = useContext(StoreContext)
  const { charInfoDispatch } = useContext(ReducerContext)

  // this will be an array of objects with the following shape:
  //  {
  //    characterId: '',
  //    url: null,
  //  }
  // const [characterEmblemUrls, setCharacterEmblemUrls] = useState([]);


  const handleSubmit = (e) => {
    console.log('i have been called')
    e.preventDefault()
    fetch(`https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/All/${text}`, {
      method: 'GET',
      headers: {
        'x-api-key': '0e7bfa6649234f578fb0c6237ad41875'
      }
    })
      .then(res => res.json())
      .then(data => {
        // setResult(data.Response[0])
        console.log(data);

        userDataDispatch({ type: 'SET_USERDATA', payload: data.Response[0] })
      })
  }

  // const getCharacterEmblems = useCallback(async () => {
  //   console.log('getCharacterEmblems has been called');
  //   let emblemUrlArray = [];
  //   charIdData.forEach(async (charId) => {
  //     const emblemPath = Reflect.get(charInfo, charId).emblemBackgroundPath;
  //     const res = await fetch(`https://www.bungie.net${emblemPath}`, {
  //       method: 'GET'
  //     });

  //     try {
  //       if (res.status === 200) {
  //         const blob = await res.blob();
  //         const url = URL.createObjectURL(blob);
  //         emblemUrlArray.push({
  //           charId: charId,
  //           url: url,
  //         });
  //       } else {
  //         throw new Error(
  //           `ERROR: request failed with status ${res.status}`
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   });

  //   setCharacterEmblemUrls(emblemUrlArray);
  // })

  const getCharacterInfo = useCallback(() => {
    fetch(`https://www.bungie.net/Platform/Destiny2/${userData.membershipType}/Profile/${userData.membershipId}?components=200`, {
      method: 'GET',
      headers: {
        'x-api-key': '0e7bfa6649234f578fb0c6237ad41875'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.Response === undefined) {
          return <Error />
        } else {
          charInfoDispatch({ type: 'SET_CHARINFO', payload: data.Response.characters.data })
        }
      })
  }, [userData.membershipType, userData.membershipId, charInfoDispatch]);

  const getCharacterIds = useCallback(() => {
    const memType = userData.membershipType
    const memId = userData.membershipId
    console.log(memId, memType)

    fetch(`https://www.bungie.net/Platform/Destiny2/${memType}/Profile/${memId}?components=100`, {
      method: 'GET',
      headers: {
        'x-api-key': '0e7bfa6649234f578fb0c6237ad41875'
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data.Response.profile.data.characterIds)
        // setCharIds(data.Response.profile.data.characterIds)
        if (data.Response === undefined) {
          return <Error />
        } else {
          charIdDispatch({ type: 'SET_CHARID', payload: data.Response.profile.data.characterIds })
        }
      })
  }, [userData.membershipId, userData.membershipType, charIdDispatch]);


  useEffect(() => {
    if (userData.membershipId && userData.membershipType) {
      getCharacterIds();
      getCharacterInfo();
      // getCharacterEmblems()
    }

  }, [userData.membershipId, userData.membershipType, getCharacterIds, getCharacterInfo])

  const handleChange = (e) => {
    setText(e.target.value)
  }


  return (
    <>
      <div className='flex justify-center '>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type='text' className='bg-gray-200 content-center shadow-md border rounded-sm border-gray-600' placeholder='Search A Guardian' value={text} />
          <button type='submit' className='bg-gray-300 border border-gray-600 shadow-md' >Search</button>
        </form>
      </div>
      <div className='flex justify-center'>
        {charIdData ? (
          <div className='flex justify-between'>
            {charIdData.map((character) => {
              return (
                <Link key={character} to={`/character/${character}`}>
                  <div className='m-2 p-1 px-5 border rounded border-solid border-green-600 bg-gray-200 justify-around'>
                    {Reflect.get(charInfo, character) &&
                      (() => {
                        if (Reflect.get(charInfo, character).classType === 2) {
                          return 'Warlock'
                        } else if (Reflect.get(charInfo, character).classType === 1) {
                          return 'Hunter'
                        } else if (Reflect.get(charInfo, character).classType === 0) {
                          return 'Titan'
                        } else {
                          return <Error />
                        }
                      })()
                    }
                  </div>
                </Link>
              )
            })}
          </div>
        ) : ('')}
      </div>
    </>
  )
}

/*
<img src={() => {
                      const urls = characterEmblemUrls.forEach((obj) => {
                        if (character === obj.characterId) {
                          return obj.url;
                        }
                      });

                      if (urls.length === 1) {
                        return urls[0];
                      }
                    }} alt="This should have an img in it mother fucker."/>
*/