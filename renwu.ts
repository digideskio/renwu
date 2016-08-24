

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

  run(func: any, time: number): [JobType, any] {
    var j = setInterval(func, time)
    this.intervalPool.push(j)
    return [JobType.Interval, j]
  }

  runOnce(func: any, time: number): [JobType, any] {
    var j = setTimeout(func, time)
    this.timeoutPool.push(j)
    return [JobType.Timeout, j]
  }  

  drop(job: any): void {
    if(job[0] === 1) {
      clearInterval(job[1])
    }else {
      clearTimeout(job[1])
    }
  }

  dropPool(jobType: JobType): void {
    if(jobType === 1) {
      for(let intervalId of this.intervalPool) {
        clearInterval(intervalId)
      }
      this.intervalPool = []
    }else {
      for(let timeoutId of this.timeoutPool) {
        clearTimeout(timeoutId)
      }
      this.timeoutPool = []
    }
  }

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