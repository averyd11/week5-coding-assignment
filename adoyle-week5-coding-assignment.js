class Member{
    constructor(name, grade){
        this.name = name;
        this.grade = grade;
    }

    describe() {
        return `${this.name} is a ${this.grade}.`;
    }
}

class Section{
    constructor(name){
        this.name = name;
        this.members = [];
    }

    addMember(name){
     if(name instanceof Member) {
        this.members.push(name);
     }  else{
        throw new Error(`You can only add an instance of Member. Argument is not a member: ${name}`);
     }
    }

    describe(){
        return `${this.name} has ${this.members.length} members.`;
    }
}

class Menu {   
    constructor(){
        this.section = [];
        this.selectedSection = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while(selection != 0) {
            switch (selection){
                case '1':
                    this.createSection();
                    break;
                case '2':
                    this.viewSection();
                    break;
                case '3':
                    this.deleteSection();
                    break;
                case '4':
                    this.displaySections();
                    break;
                default:
                        selection = 0;

            }
            selection = this.showMainMenuOptions();
        }
        
        alert('Goodbye!')
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new section
        2) view section
        3) delete section
        4) display all sections
        `);
    }
    
    showSectionMenuOptions(sectionInfo){
        return prompt(`
        0) back
        1) create member
        2) delete member
        -------------------
        ${sectionInfo}
        `);
    }
    displaySections(){
        let sectionString = '';
        for (let i = 0; i < this.section.length; i++){
            sectionString += i + ') ' + this.section[i].name + '\n';
        }
        alert(sectionString);
    }

    createSection(){
        let name = prompt('Enter name for new section:');
        this.section.push(new Section(name));
    }
    viewSection(){
        let index = prompt('Enter the index of the section you wish to view');
        if(index > -1 && index < this.section.length){
            this.selectedSection = this.section[index];
            let description = 'Section Name: ' + this.selectedSection.name + '\n';

            for(let i = 0; i < this.selectedSection.members.length; i++) {
                description += i + ') ' + this.selectedSection.members[i].name 
                    + ' - ' + this.selectedSection.members[i].grade + '\n';
        }

            let selection = this.showSectionMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createMember();
                    break;
                case '2':
                    this.deleteMember();
            }
    }
    }
    
    
    
    deleteSection(){
        let index = prompt('Enter the index of the Section you want to delete');
        if(index > -1 && index < this.section.length){
            this.section.splice(index, 1);
        }
    }


    createMember(){
        let name = prompt('Enter name for new member;');
        let section = prompt('Enter the grade for new player');
        this.selectedSection.members.push(new Member(name, section));
    }

    deleteMember(){
        let index = prompt('Enter the index of the member you wish to delete');
        if(index > -1 && index < this.selectedSection.members.length){
          this.selectedSection.members.splice(index,1);  
        }
    }
}




let menu = new Menu();
menu.start();