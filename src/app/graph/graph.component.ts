import { Component, OnInit ,Input,OnChanges} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html'
})
export class GraphComponent implements OnInit, OnChanges  {

  constructor() { }
  @Input() public formData;
  public chartOptions ={
    scaleShowVerticalLines:false,
    responsive:true,

  }
  public chartLabel=[
  ]
  public chartType='line'
  public chartLegend=true
  public chartData=[{data:[],label:'height'}]
  addData(){
    let c=0;
    this.chartLabel=[]
    this.chartData['data']=[]
    this.formData.forEach(ele=>{
      if(c==0){
        c=1;
        this.chartLabel.push(ele.x);
        this.chartData[0].data.push(ele.y);
      }
      else{
        c=0;
      }
    })
    
  }
  ngOnInit(){

  }
  ngOnChanges(): void {
    if(this.formData){
        this.addData()
        console.log(this.chartLabel)
    }
  }

}
