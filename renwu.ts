

enum JobType {
  Interval = 1,
  Timeout = 2
}

export module Time {
  
  export function seconds(n: number) {
    return n * 1000
  }

  export function minutes(n: number) {
    return n * 60 * 1000
  }

  export function hours(n: number) {
    return n * 60 * 60 * 1000
  }

  export function days(n: number) {
    return n * 24 * 60 * 60 * 1000
  }

  //returns the time difference in ms between a future datetime and datetime now
  export function date(d: Date) {
    return d.getTime() - (new Date().getTime())
  }
}

export class Renwu {

  private intervalPool: any[]
  private timeoutPool: any[]

  constructor() {
    this.intervalPool = []
    this.timeoutPool = []
  }

  /**
   * run task repeatly with an interval time, optional to set number of repeats 
   */
  run(func: any, interval: number, times?: number): [JobType, any] {
    var j = setInterval(func, interval)
    this.intervalPool.push(j)
    if(times != undefined){
      console.log('dsds')
      this.runOnce(() => {
        this.drop(j)
      }, ((interval * times) + 100))
    }
    return [JobType.Interval, j]
  }

  /**
   * run task once after the delay
   */
  runOnce(func: any, delay: number): [JobType, any] {
    var j = setTimeout(func, delay)
    this.timeoutPool.push(j)
    return [JobType.Timeout, j]
  }  

  /**
   * run task on a specific date
   */
  runOn(func: any, date: Date) {
    if(date.getTime() < new Date().getTime()) {
      console.error('connot schedule job for the past')
      return null
    }
    var j = setTimeout(func, Time.date(date))
    this.timeoutPool.push(j)
    return [JobType.Timeout, j] 
  }

  /**
   * drop a scheduled job
   */
  drop(job: any): void {
    if(job[0] === 1) {
      clearInterval(job[1])
    }else {
      clearTimeout(job[1])
    }
  }

  /**
   * drop all scheduled jobs
   */
  dropAll(): void {
    for(let intervalId of this.intervalPool) {
      clearInterval(intervalId)
    }
    
    for(let timeoutId of this.timeoutPool) {
      clearTimeout(timeoutId)
    }

    this.intervalPool = []
    this.timeoutPool = []
  }


}