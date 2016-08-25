
import { Renwu, Time } from './renwu'

export function test() {

  var r = new Renwu()

  r.run(() => {
    console.log('task 1: this will run every sec for 3 times')
  }, Time.seconds(1), 3)

  var j2 = r.run(() => { 
    console.log('task 2: this will run every 2 sec')
  }, Time.seconds(2))

  r.runOnce(() => {
    console.log('drop job 2')
    r.drop(j2)
  }, Time.seconds(7))


  var delayMax = 0
  var j3 = r.runOnChange(() => {  //task 
    console.log('this will run after delay of 2 sec and increment of 1 sec in delay after each cycle')
  }, Time.seconds(2), (delay: number) => {  //return next task delay time
    delayMax = delay + Time.seconds(1)
    return delay + Time.seconds(1)
  }, () => {  //stop condition: when next delay is more than 5 seconds
    return delayMax > Time.seconds(5)
  })

}
