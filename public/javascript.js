
const Details = [
    {
      name: "DewDropFlorist",
      shop: "17 N Dewdrops MI 13233 US",
      order: "10221",
      note: "Note For Delivery",
      instruction: "-leave at door if not at home",
      address: "-14524 scottland US 244 mr jemmy",
   
      text: "address",
      ordertxt: "Order Id -",
      statustxt: "Status :",
      status: "delivered",
    },
  
    {
      name: "Arena Flowers",
      shop: "17 N Dewdrops MI 13233 US",
      order: "10223",
      note: "Note For Delivery",
      instruction: "-please call before arrive",
      address: "-14333 fiji US 323 Scott",
    
      text: "address",
      ordertxt: "Order Id -",
      statustxt: "Status :",
      status: "pending",
    },
  ]
  
      var found = Details.find(e => e.status === 'delivered');
      // console.log("find method",found)
       var c = found.status
       console.log(c)
      
      var filter = Details.filter(e => e.status == 'pending')
      //   console.log("filter method",filter)
       var b = filter.text
      //  console.log(b)
       
       let result = Details.map(a => a.status == 'delivered');
      //  console.log("map method",result)
       var d = result.status
      //  console.log(d)
    
      // console.log(found);
      
      // console.log(b)
      
  // console.log(arr)