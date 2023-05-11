import React from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditNoteIcon from "@mui/icons-material/EditNote";
import demo1 from "../images/demo1.jpeg";
import demo2 from "../images/demo2.jpg";
import demo3 from "../images/demo3.jpg";
import profile1 from "../images/profile1.jpg";
import profile2 from "../images/profile2.jpg";
import Menu from "./Menu"
const Feed = () => {
  return (
    <div className="single " style={{ marginTop: "4rem" }}>
      <div className="content">
        <div className="fullpost">
          <div className="image">
            <img src={demo1} />
          </div>
          <div className="author">
            <div className="written">
              <div className="profilephoto">
                <img src={profile1} />
              </div>
              <div className="details">
                <div className="name">Anotelly Fuhui</div>
                <div className="time">Posted 2 months ago</div>
              </div>
            </div>
            <div className="iconsoption">
              <DeleteSweepIcon sx={{fontSize:'35px'}}/>
              <EditNoteIcon sx={{fontSize:'35px'}}/>
            </div>
          </div>
          <div className="description">
            <div className="title">SunFlower Supremacy</div>
            <div className="writeup">
              lorem  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum saepe nemo et corporis vitae dolor consectetur architecto deserunt laborum veniam illo delectus quasi voluptatum, recusandae dignissimos! Accusantium doloribus aperiam mollitia.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, numquam illum autem doloribus optio sunt officia vero rem, adipisci voluptatibus a quibusdam voluptate atque doloremque dolorum cumque magnam debitis! Repellendus.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
              nam excepturi, natus tempora labore ea molestias et reprehenderit
              distinctio voluptatum adipisci quam sunt nostrum consequatur
              cupiditate. Culpa pariatur quas earum!lorem
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dolorum quis libero laboriosam eos perspiciatis? Recusandae consequuntur maiores labore vel repellat totam repudiandae mollitia rerum distinctio qui amet, quisquam nam?
            </div>
          </div>
        </div>
      </div>
      <div className="menu"><Menu /></div>
    </div>
  );
};

export default Feed;
