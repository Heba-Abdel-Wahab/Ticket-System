import axios from "axios";
import authHeader from "./auth-header";
import langHeader from "./lang-header";

const API_URL = "http://xxxxxxxxxxxx:8080/api/";


class TicketService{

    createNewTicket(data){
        console.log("create ticket");
        return axios.post(
            API_URL + "ticket/create",{
                title:data.title,
                message:data.messageF,
                category:data.category,
            },          
            {
                headers: {
                 ...authHeader(),
                  ...langHeader(),
                },
            }
          
        )
    }

    createNewPublicTicket(data){
        console.log("create public ticket");
        return axios.post(
            API_URL + "ticket/create/public",{
                name:data.name,
                mail:data.mail,
                title:data.title,
                message:data.messageF,
                category:data.category,
            },
            {
                headers: {
                  ...langHeader(),
                },
            }

        );
    }
    categoriesList(){
        return axios.post(
            API_URL + "ticket/list/categories",
            {},
            {
              headers: {
                ...langHeader(),
              },
            }
          );
    }
    listTickets(){//   TicketList()
        return axios.post(
            API_URL + "ticket/list",
            {},
            {
              headers: {
                ...authHeader(),
                ...langHeader(),
              },
            }
          );
    }

    getTicketById(id){
      return axios
      .post(
          API_URL + "ticket/read",
        {
          id: id,
        },
        {
          headers: {
            ...authHeader(),
            ...langHeader(),
          },
        }
      );

    }

    listAdmins(){
      return axios.post(
          API_URL + "list/admins",
          {},
          {
            headers: {
              ...authHeader(),
              ...langHeader(),
            },
          }
        );
  }


  myticket(){
    return axios.post(
        API_URL + "ticket/list/created",
        {},
        {
          headers: {
            ...authHeader(),
            ...langHeader(),
          },
        }
      );
  };

  assignedAdmin(assigned,id){
    return axios.post(API_URL + "ticket/assign",
    {
      user: assigned,
      ticket: id        
    },{
      headers: {
        ...authHeader(),
        ...langHeader(),
      },
    })
  };

  ChangeTicketStatus(id, message, status){
    return axios.post(API_URL + "ticket/reply",
      {
        id: id,
        message: message,
        status:status,

      },{
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      })
  };

  ReplyTicket(id,message,status){
    return axios.post(API_URL + "ticket/reply",
    {
      id: id,
      message:message,
      status:status,
    },
    {
      headers: {
        ...authHeader(),
        ...langHeader(),
      },
    })
  }    

}

export default new TicketService;