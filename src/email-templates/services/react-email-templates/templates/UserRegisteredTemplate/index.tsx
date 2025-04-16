import React from 'react';
import { UserRegisteredDto } from '@/users/dto/user-registered.dto';

export interface UserRegisteredTemplateProps {
  userRegisteredDto: UserRegisteredDto;
}

export default function UserRegisteredTemplate({ userRegisteredDto }: UserRegisteredTemplateProps) {
  return (
    <div>
      <p>
        Be our guest, <b>{userRegisteredDto.username}</b>!
      </p>
    </div>
  );
}
