import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { format } from "date-fns";

interface IProp {
  extract: {
    id: string;
    value: string;
    type: string;
    createdAt: string;
  }[];
}

const ListExtract: React.FC<IProp> = ({ extract }) => {
  return (
    <List>
      {!extract.length ? (
        <p>Você ainda não fez nenhuma movimentação</p>
      ) : (
        extract.map((i) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                {i.type === "deposit" ? (
                  <ArrowUpward style={{ color: green[500] }} />
                ) : (
                  <ArrowDownward style={{ color: red[500] }} />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={i.value}
              secondary={format(new Date(i.createdAt), "LLL q, yyyy")}
            />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default ListExtract;
