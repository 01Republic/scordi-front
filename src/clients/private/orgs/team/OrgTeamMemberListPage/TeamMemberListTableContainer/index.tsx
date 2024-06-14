import React, {memo} from 'react';
import {Paginator} from './Paginator';
import {TeamMemberTable} from './TeamMemberTable';

interface TeamMemberListTableContainerProps {}

export const TeamMemberListTableContainer = memo((props: TeamMemberListTableContainerProps) => {
    return (
        <div className="card card-bordered bg-white rounded-md">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div></div>

                    <Paginator />
                </div>

                <div className="mb-4">
                    <TeamMemberTable />
                </div>

                <div className="flex items-center justify-between">
                    <div></div>

                    <Paginator />
                </div>
            </div>
        </div>
    );
});
TeamMemberListTableContainer.displayName = 'TeamMemberListTableContainer';
