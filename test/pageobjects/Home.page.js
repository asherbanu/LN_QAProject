import { $ } from '@wdio/globals'
import Page from './page.js' 

class HomePage extends Page {
    get logoOnHomepage () {
        return $('.gPDR-logo-image') 
    }
    
    get loginElement () {
        return $('//div[@aria-label="Sign in"]') 
    }
    
    open () {
        return super.open('/') 
    }
}
export default new HomePage()