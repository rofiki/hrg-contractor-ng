import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thaiDate'
})
export class ThaiDatePipe implements PipeTransform {

	transform(val : Date) : string
  {        

		let d = new Date(val.toString().replace(/-/g, '/'));
    if (d){
      let y:number = d.getFullYear();
      if (y < 2200) y += 543;

      return d.getDate().toString().padStart(2, '0')
        + '/' + (d.getMonth() +1).toString().padStart(2, '0')
        + '/' + y.toString();
    }
    return "";
  }

}

@Pipe({ name: 'thaifulldate' })
export class ThaifulldatePipe implements PipeTransform {
	transform(val : Date) : string
  {    
		let d = new Date(val.toString().replace(/-/g, '/'));
		let months = Array("มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม");

    if (d){
      let y:number = d.getFullYear();
      if (y < 2200) y += 543;

      return d.getDate().toString()
				+ ' ' + months[(d.getMonth() +1)]
        + ' ' + y.toString();
    }
    return "";
  }

}

@Pipe({ name: 'thaishortdate' })
export class ThaishortdatePipe implements PipeTransform {
	transform(val : Date | string) : string
  {    
    // console.log(val.toString().replace(/-/g, '/'));
    let d = new Date(val.toString().replace(/-/g, '/'));
    // console.log(d)
		let months = Array("","ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.");


    if (d){
      let y:number = d.getFullYear();
      if (y < 2200) y += 543;

      return d.getDate().toString()
				+ ' ' + months[(d.getMonth() +1)]
        + ' ' + y.toString();
    }
    return "";
  }
}

@Pipe({ name: 'thaishortmonth' })
export class ThaishortmonthPipe implements PipeTransform {
	transform(val : Date) : string
  {    
		let d = new Date(val.toString().replace(/-/g, '/'));
		let months = Array("","ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.");

    if (d){      
      return months[(d.getMonth() +1)];
    }
    return "";
  }
}

@Pipe({ name: 'thaiyear' })
export class ThaiyearPipe implements PipeTransform {
	transform(val : Date) : string
  {    
		let d = new Date(val.toString().replace(/-/g, '/'));

    if (d){
      let y:number = d.getFullYear();
      if (y < 2200) y += 543;

      return y.toString();
    }
    return "";
  }

}