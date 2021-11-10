import React from 'react';
import { useSelector } from 'react-redux';

export const hasUserPlayedAGW = () => {
    let res = useSelector(state => state.players.teamPoints.starters);
    return res;
}