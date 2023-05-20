// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedSet, UnorderedMap} from 'near-sdk-js';

@NearBindgen({})
class Votingcontract {
 
//  candidate pair to store candidate name and url

candidatePair= new UnorderedMap<string[]>("candidatePair");
 // prompt set

 promptset =new UnorderedSet<string>("prompt");

 //vote array

 voteArray=new UnorderedMap<number[]>("voteArray");

 //keeping track of user participation

 userParticipation= new UnorderedMap<string[]>("UserParticipation");


   @call({}) 
   addCandidatePair({prompt, name1, name2, url1, url2}: 
    {prompt :string;
     name1: string;
    name2:string;
    url1:string;
    url2:string;})
   {
     this.candidatePair.set(prompt,[name1,url1,name2,url2]);   
   }
  @call({})
  initvote({prompt}:{prompt: string})
  {
    this.voteArray.set(prompt,[0,0]);
  }

  @call({})
  addtopromptset({prompt}:{prompt: string})
  {
  this.promptset.set(prompt);
  }
  
  // @call({})
  // clearpromptarray(){
  //   this.promptset.clear();
  //   this.candidatePair.clear();
  //   this.userParticipation.clear();
  //   this.voteArray.clear();
  //   near.log("clearing poll");
  // }

  @call({})
  addVote({prompt,index}: {prompt: string;index: number})
  {
    let currentVote=this.voteArray.get(prompt,{defaultValue:[0,0]});

    currentVote[index]=currentVote[index]+1;
    this.voteArray.set(prompt,currentVote);
  }

  @call({})
  recorduser({prompt,user}:{prompt:string; user:string})
  {
  let currentArray=this.userParticipation.get(prompt,{defaultValue:[]});
  currentArray.includes(user)?null:currentArray.push(user);
  this.userParticipation.set(prompt,currentArray);
  }

   @view({})
   geturl({prompt,name}:{prompt:string; name:string}):string
   {
   near.log(prompt);
   let candidateArray=this.candidatePair.get(prompt);
   return candidateArray[candidateArray.indexOf(name)+1];
   }

   @view({})
   didparticipate({prompt,user}:{prompt:string;user:string}):boolean
   {
     let promptuserlist:string[]=this.userParticipation.get(prompt,{defaultValue:[]});
     return promptuserlist.includes(user);
   }
   @view({})
   participationarray({prompt}:{prompt:string }):string[]
   {
return this.userParticipation.get(prompt);
   }
   @view({})
   getallprompt():string[]
   {
    return this.promptset.toArray();
   }
   @view({})
   getValue({prompt}:{prompt:string}):number[]
   {
    return this.voteArray.get(prompt,{defaultValue: []});
   }

   @view({})
   getcandidatepair({prompt}:{prompt:string}):string[]
   {
    let candidateArray=this.candidatePair.get(prompt,{defaultValue: ["n/a","n/a","n/a","n/a"]});
    return [candidateArray[0],candidateArray[2]];
   }


}