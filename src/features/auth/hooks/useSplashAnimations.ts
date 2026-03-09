import { useEffect, useRef } from "react"
import { Animated, Easing } from "react-native"

export const useLoginAnimations = (isLoading:boolean) => {

  const contentOpacity = useRef(new Animated.Value(0)).current

  const logoOpacity = useRef(new Animated.Value(0)).current
  const logoTranslateY = useRef(new Animated.Value(24)).current

  const mascotOpacity = useRef(new Animated.Value(0)).current
  const mascotTranslateY = useRef(new Animated.Value(24)).current

  const bannerOpacity = useRef(new Animated.Value(0)).current
  const bannerTranslateY = useRef(new Animated.Value(24)).current

  const badgesOpacity = useRef(new Animated.Value(0)).current
  const badgesTranslateY = useRef(new Animated.Value(24)).current

  const formOpacity = useRef(new Animated.Value(0)).current
  const formTranslateY = useRef(new Animated.Value(24)).current

  const loginOpacity = useRef(new Animated.Value(0)).current
  const loginTranslateY = useRef(new Animated.Value(24)).current

  const dividerOpacity = useRef(new Animated.Value(0)).current
  const dividerTranslateY = useRef(new Animated.Value(24)).current

  const signupOpacity = useRef(new Animated.Value(0)).current
  const signupTranslateY = useRef(new Animated.Value(24)).current

  const bottomOpacity = useRef(new Animated.Value(0)).current
  const bottomTranslateY = useRef(new Animated.Value(24)).current

  const mascotFloat = useRef(new Animated.Value(0)).current
  const loadingRotate = useRef(new Animated.Value(0)).current
  const buttonPulse = useRef(new Animated.Value(1)).current

  const emailScale = useRef(new Animated.Value(1)).current
  const passwordScale = useRef(new Animated.Value(1)).current


  useEffect(() => {

    Animated.timing(contentOpacity,{
      toValue:1,
      duration:220,
      useNativeDriver:true
    }).start()

    const sections = [
      {opacity:logoOpacity, translateY:logoTranslateY, delay:100},
      {opacity:mascotOpacity, translateY:mascotTranslateY, delay:200},
      {opacity:bannerOpacity, translateY:bannerTranslateY, delay:300},
      {opacity:badgesOpacity, translateY:badgesTranslateY, delay:400},
      {opacity:formOpacity, translateY:formTranslateY, delay:500},
      {opacity:loginOpacity, translateY:loginTranslateY, delay:600},
      {opacity:dividerOpacity, translateY:dividerTranslateY, delay:700},
      {opacity:signupOpacity, translateY:signupTranslateY, delay:800},
      {opacity:bottomOpacity, translateY:bottomTranslateY, delay:900},
    ]

    const timers = sections.map(section =>
      setTimeout(()=>{
        Animated.parallel([
          Animated.timing(section.opacity,{
            toValue:1,
            duration:380,
            useNativeDriver:true
          }),
          Animated.spring(section.translateY,{
            toValue:0,
            stiffness:300,
            damping:24,
            mass:1,
            useNativeDriver:true
          })
        ]).start()
      },section.delay)
    )

    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotFloat,{
          toValue:-10,
          duration:1200,
          easing:Easing.inOut(Easing.ease),
          useNativeDriver:true
        }),
        Animated.timing(mascotFloat,{
          toValue:0,
          duration:1200,
          easing:Easing.inOut(Easing.ease),
          useNativeDriver:true
        })
      ])
    ).start()

    return ()=> timers.forEach(clearTimeout)

  },[])



  useEffect(()=>{

    if(!isLoading){

      loadingRotate.stopAnimation()
      buttonPulse.stopAnimation()

      loadingRotate.setValue(0)
      buttonPulse.setValue(1)

      return
    }

    Animated.loop(
      Animated.timing(loadingRotate,{
        toValue:1,
        duration:600,
        easing:Easing.linear,
        useNativeDriver:true
      })
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse,{
          toValue:1.02,
          duration:400,
          useNativeDriver:true
        }),
        Animated.timing(buttonPulse,{
          toValue:1,
          duration:400,
          useNativeDriver:true
        })
      ])
    ).start()

  },[isLoading])



  const spin = loadingRotate.interpolate({
    inputRange:[0,1],
    outputRange:["0deg","360deg"]
  })



  const focusEmail = () => {
    Animated.spring(emailScale,{
      toValue:1.01,
      stiffness:400,
      damping:25,
      useNativeDriver:true
    }).start()
  }

  const blurEmail = () => {
    Animated.spring(emailScale,{
      toValue:1,
      stiffness:400,
      damping:25,
      useNativeDriver:true
    }).start()
  }

  const focusPassword = () => {
    Animated.spring(passwordScale,{
      toValue:1.01,
      stiffness:400,
      damping:25,
      useNativeDriver:true
    }).start()
  }

  const blurPassword = () => {
    Animated.spring(passwordScale,{
      toValue:1,
      stiffness:400,
      damping:25,
      useNativeDriver:true
    }).start()
  }


  return {

    contentOpacity,

    logoOpacity,
    logoTranslateY,

    mascotOpacity,
    mascotTranslateY,
    mascotFloat,

    bannerOpacity,
    bannerTranslateY,

    badgesOpacity,
    badgesTranslateY,

    formOpacity,
    formTranslateY,

    loginOpacity,
    loginTranslateY,

    dividerOpacity,
    dividerTranslateY,

    signupOpacity,
    signupTranslateY,

    bottomOpacity,
    bottomTranslateY,

    emailScale,
    passwordScale,

    focusEmail,
    blurEmail,
    focusPassword,
    blurPassword,

    buttonPulse,

    spin
  }
}