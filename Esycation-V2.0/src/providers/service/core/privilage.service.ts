import {Injectable} from '@angular/core';

@Injectable()
export class PrivilageService{

    protected menu:Array<any> = [];
    protected pages: Array<any>;

    constructor(){}

  
    public privilaged(module?:String):Array<any>{

      console.log("Privilage module===",module);

      if(module=='STAFF')
       return this.findStaffRole();
      //return this.adminRole();
      else if(module=='GUARDIAN'){
        return this.findGuardianRole();
      }
      else if(module=='STUDENT'){
        return this.findStudentRole();
      }
      else{
        return this.adminRole()
      }
        
    }

    findStaffRole():Array<any>{

      this.menu = [          
                 {
                    title: 'Attendances & Leave',
                    iconLeft: 'ios-clipboard-outline',
                    icon: 'ios-add-outline',
                    showDetails: false,
                    items:  [
                      {
                      name:'Attendance',
                      component:'ManageAttendanceComponent'
                      },
                      {
                        name:'Leave',
                        component:'StaffLeaveComponent'
                      },
                      {
                        name:'Staff DashBoard',
                        component:'StaffDashboardComponent'
                      },
                      {
                        name:'Guardian DashBoard',
                        component:'GuardianDashboardComponent'
                      },
                      {
                        name:'Student DashBoard',
                        component:'StudentDashboardComponent'
                      }
                    ]
                  } ,
                  {
                    title: 'Notifications',
                    iconLeft: 'ios-chatboxes-outline',
                    icon: 'ios-add-outline',
                    showDetails: false,
                    items:  [
                      {
                      name:'Notification',
                      component:'ViewAllNotificationComponent'
                      },
                      {
                        name:'Bulk Notification',
                        component:'BulkNotificationComponent'
                      }
                    ]
                  },
                  {
                    title: 'Exam & Result',
                    iconLeft: 'ios-book-outline',
                    icon: 'ios-add-outline',
                    showDetails: false,
                    items:  [
                      {
                      name:'Result',
                      component:'ResultEntiryViewComponent'
                      },
                      {
                        name:'Assassment',
                        component:'AssassmentViewComponent'
                      }
                    ]
                  },
            ];
        
       return this.menu;
    }

    findGuardianRole():Array<any>{
      
            this.menu = [          
                        {
                          title: 'Notifications',
                          iconLeft: 'ios-chatboxes-outline',
                          icon: 'ios-add-outline',
                          showDetails: false,
                          items:  [
                            {
                            name:'Notification',
                            component:'ViewAllNotificationComponent'
                            }
                          ]
                        },
                        {
                          title: 'Leave',
                          iconLeft: 'ios-calendar-outline',
                          icon: 'ios-add-outline',
                          showDetails: false,
                          items:  [
                            {
                            name:'Apply',
                            component:'LeaveComponent'
                            }
                          ]
                        }
                  ];
              
             return this.menu;
      }
      findStudentRole():Array<any>{
        
              this.menu = [          
                          {
                            title: 'Notifications',
                            iconLeft: 'ios-chatboxes-outline',
                            icon: 'ios-add-outline',
                            showDetails: false,
                            items:  [
                              {
                              name:'Notification',
                              component:'ViewAllNotificationComponent'
                              }
                            ]
                          },
                          {
                            title: 'Leave',
                            iconLeft: 'ios-calendar-outline',
                            icon: 'ios-add-outline',
                            showDetails: false,
                            items:  [
                              {
                              name:'Apply',
                              component:'LeaveComponent'
                              }
                            ]
                          }
                    ];
                
               return this.menu;
        }

        adminRole(){

          this.menu = [          
            
                    {
                      title: 'Layout with firebase',
                      myicon:'',
                      iconLeft: 'ios-filing',
                      icon: 'ios-add-outline',
                      showDetails: false,
                      items:  [
                            
                          {name:'Authentication(Login)',component:'LoginPage'},
                          {name:'Authentication(Register)',component:'RegisterPage'},
                          {name:'Authentication(Forgot)',component:'ForgotPage'},
                          {name:'Authentication(Profile)',component:'AfterLoginPage'},
                          {name:'Chart',component:'ChartPage'},
            
                          {name:'City guide', component: 'Category1Page'},// app1 folder
                          {name:'Shopping',component:'Category2Page'},// app2 folder
                          {name:'Restaurant',component:'Category3Page'}, // app3 folder
                          {name:'Google map',component: 'MapPage'},
                          {name:'Image gallery',component: 'GalleryPage'},
                          {name:'Feed',component: 'FeedPage'},
                          {name:'Form',component: 'FormResultPage'},
            
            
                          {name:'Intro', component:'IntroPage'},
            
                          {name:'Pinterest(Masonry)',component: 'MasonryPage'},
                          {name:'Profile1',component: 'ProfilePage'},
                          {name:'Profile2',component: 'Profile2Page'},
                          {name:'Profile3',component: 'Profile3Page'},
                          {name:'Profile4', component: 'Profile4Page'},
                          {name:'Radio player',component:'RadioListPage'},
            
                          {name:'Search',component:'SearchPage'},
                          {name:'Timeline',component: 'TimelinePage'}
                      ]
                    }, {
                      title: 'Components',
                      iconLeft: 'ios-copy',
                      icon: 'ios-add-outline',
                      showDetails: false,
                      items:  [
                            {name:'Accordion',component:'AccordionPage'},
            
                            {name:'Action sheet',component:'ActionsheetPage'},
                            {name:'Alert',component:'AlertPage'},
                            {name:'Animation',component:'AnimationsPage'},
            
                            {name:'Button',component:'ButtonPage'},
                            {name:'Datetime',component:'DatetimePage'},
                            {name:'Fab', component:'FabPage'},
                            {name:'Fading header',component:'FadingHeaderPage' },
                            {name:'Grid', component:'GridPage'},
                            {name:'Header',component:'HeaderPage'},
                            {name:'Input',component:'InputPage'},
                            {name:'Item',component:'ItemPage'},
                            {name:'Item sliding',component:'ItemSlidingPage'},
                            {name:'Label',component:'LabelPage'},
                            {name:'Radio button',component:'RadioButtonPage'},
                            {name:'Rating',component:'RatingPage'},
                            
                            {name:'Range',component:'RangePage'},
                            {name:'Search bar', component:'SearchBarPage'},
                            {name:'Select option',component:'SelectOptionPage'},
                            {name:'Segment',component:'SegmentPage'},
                            {name:'Shrinking',component:'ShrinkingPage'},
            
                            {name:'Tag',component:'TagPage'},
                            {name:'Table',component:'TablePage'},
                            {name:'Transparent header',component:'TransparentHeaderPage'},
                            {name:'Toast',component:'ToastPage'}
            
                        ]
                    },{
                      title: 'Theme',
                      iconLeft: 'md-color-palette',
                      icon: 'ios-add-outline',
                      showDetails: false,
                      items:  [
                        {
                        name:'Color',
                        component:'ThemePage'
                        }
                      ]
                    },
                    {
                        title: 'Attendances',
                        iconLeft: 'ios-clipboard-outline',
                        icon: 'ios-add-outline',
                        showDetails: false,
                        items:  [
                          {
                          name:'Attendance',
                          component:'ManageAttendanceComponent'
                          }
                        ]
                      } ,
                      {
                        title: 'Notifications',
                        iconLeft: 'ios-chatboxes-outline',
                        icon: 'ios-add-outline',
                        showDetails: false,
                        items:  [
                          {
                          name:'Notification',
                          component:'ViewAllNotificationComponent'
                          }
                        ]
                      },
                      {
                        title: 'Leave',
                        iconLeft: 'ios-calendar-outline',
                        icon: 'ios-add-outline',
                        showDetails: false,
                        items:  [
                          {
                          name:'Apply',
                          component:'LeaveComponent'
                          }
                        ]
                      }
                ];
            
                this.pages = [ 
                  // { icon:'call', title:'Contact us', component: 'ContactPage' },
                  { icon:'bookmark', title:'Version 1.1.0', component: "" }    
                ];
          return this.menu;
        }


      
}