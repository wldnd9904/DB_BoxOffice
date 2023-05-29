import React from 'react';
import styled from "styled-components";

interface GradeParams {
    grade:number|string;
};
const GradeBox = styled.div<GradeParams>`
    width:22px;
    height:22px;
    background: url(https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/grades/grade_${props => props.grade}.png?raw=true) 0 0 no-repeat
`;

function Grade(params:GradeParams) {
    return <GradeBox grade={params.grade} />;
}

export default Grade;