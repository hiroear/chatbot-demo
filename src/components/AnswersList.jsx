import {Answer} from "./index"

const AnswersList = (props) => {
  return(
    <div className="c-grid__answer">
      {props.answers.map((val, index) => {
        return <Answer content={val.content} nextId= {val.nextId} selectAnswer={props.selectAnswer} key={index.toString()} />
      })}
        {/* 引数にindex を作っており 1回目のanswersは0番目、2回目のanswersは1番目...という風にindexが作られていくので、key={index.toString()}と書かないとコンソールでエラーが出てしまう */}
    </div>
  )
}

export default AnswersList;