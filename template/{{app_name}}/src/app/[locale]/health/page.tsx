'use client'

import { Member, MembersApi } from "src/api/MembersApi";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [members, setMembers] = useState<Member[]>([]);

  const getMembers = async () => {
    try {
      const members = await MembersApi.getMembers();
      setMembers(members);
      console.log(members);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <React.Fragment>
      <h1>Members</h1>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            <h2>{member.lastName}</h2>
            <p>{member.description}</p>
            <p>Favorite fruit: {member.favoriteFruit}</p>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
