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


    public getWordList(crit:string, trunc?:boolean) : string
    {
        if (trunc == null) trunc = false;
        let words:string[] = crit.split(" ");

        crit = "";

        if (trunc)
        {
            for (let i = 0; i < words.length; i++) 
            {
                words[i] = words[i].trim();
                crit += "& "+words[i]+":* ";
            }
        }
        else
        {
            for (let i = 0; i < words.length; i++) 
            {
                words[i] = words[i].trim();
                if (words[i].endsWith("*")) crit += "& "+words[i]+":* ";
                else if (words[i].endsWith("%")) crit += "& "+words[i]+":* ";
                else crit += "& "+words[i]+" ";
            }
        }


        return(crit.substr(2).trim());

    }
}