export class TextSearch
{
    public getQueryFunction(type?:string) : string
    {
        let op:string = null;

        switch(type)
        {
            case "web": op = "websearch_to_tsquery"; break;
            default: op = "to_tsquery";
        }

        return(op);
    }


    public listOfValues(crit:string) : string
    {
        crit = crit.trim();
        crit = crit.replace("*","");
        crit = crit.replace("%","");

        let words:string[] = crit.split(" ");
        crit = "";

        for (let i = 0; i < words.length; i++) 
            crit += "& "+words[i]+":* ";
        
        return(crit.substr(2).trim());
    }


    public getWordList(crit:string) : string
    {
        if (crit == null) return(null);
        let words:string[] = crit.split(" ");

        crit = "";

        for (let i = 0; i < words.length; i++) 
        {
            if (words[i].endsWith("*")) crit += "& "+words[i]+":* ";
            else if (words[i].endsWith("%")) crit += "& "+words[i]+":* ";
            else crit += "& "+words[i]+" ";
        }

        return(crit.substr(2).trim());
    }
}