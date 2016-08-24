
import { Renwu, Time } from './renwu'

export function test() {

  var r = new Renwu()
  
  var j =r.run(() => { 
    console.log('this will run every 2 sec, and stopped at sec 7')
  }, Time.seconds(2))

  r.runOnce(() => {
    r.drop(j)
  }, Time.seconds(7))

  r.runOnce(() => {
    console.log('this will run at sec 9, and drop all jobs')
    r.dropAll()
  }, Time.seconds(9))
  
  r.runOnce(() => {
    console.log('this will not run (killed at sec 9)')
  }, Time.seconds(10))


  var now = new Date()
  now.setSeconds(now.getSeconds() + 1)

  r.runOnce(() => {
    console.log('this will run at sec 1')
  }, Time.date(now))


}
