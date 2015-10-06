/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var Security = {
    user: '',
    password: '',
    people: null,
    token : null,
    tokenuser:null,
    session:null,
    reset:function(){
        this.user = null;
        this.password = null;
        this.token = null;
        this.people = null;
        this.session = false;
    }
};

