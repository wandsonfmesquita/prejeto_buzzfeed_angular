import { Component, OnInit } from '@angular/core';
import quizz_question from "../../../assets/data/quizz_question.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string= ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answersSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() {}

  ngOnInit(): void {
    if(quizz_question){
      this.finished = false
      this.title =  quizz_question.title

      this.questions = quizz_question.questions
      this.questionSelected = this.questions[this.questionMaxIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }

  playerChoose(value:string) {
    this.answers.push(value)
    this.nexStep()
  }

  async nexStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string =await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = quizz_question.results[finalAnswer as keyof typeof quizz_question.results]

    }
  }

   async checkResult (answers:string[]) {
     const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous
      } else {
        return current
      }
     })
     return result
   }

}
