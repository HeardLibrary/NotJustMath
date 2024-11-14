import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import SearchBar from "../../components/SearchBar/SearchBar";
import { listLessonPlans } from "../../util/dynamo";
import { LessonPlanApprovalStates } from "../../util/constants";
import "./SearchPage.css";
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [lessonPlans, setLessonPlans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAndSetLessonPlans() {
            const lessonPlans = await listLessonPlans();
            const activeLessonPlans = lessonPlans.filter(
                lessonPlan => lessonPlan.approval_state === LessonPlanApprovalStates.APPROVED
            );
            setLessonPlans(activeLessonPlans);
        }

        getAndSetLessonPlans();
    }, []);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'lesson_title',
            key: 'lesson_title',
            render: (text, record) => <a href={`/lesson/${record.id}`}>{text}</a>,
        },
        {
            title: 'Grade',
            key: 'grade_level',
            render: (_, record) =>
                record.grade_level_lower === record.grade_level_upper
                    ? `${record.grade_level_lower}`
                    : `${record.grade_level_lower} - ${record.grade_level_upper}`,
        },
        {
            title: 'Math Concepts',
            dataIndex: 'math_concept_tags',
            key: 'math_concept_tags',
            render: (tags) => (
                <>
                    {tags && tags.map((tag) => (
                        <Tag color="blue" key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Social Concepts',
            dataIndex: 'social_concept_tags',
            key: 'social_concept_tags',
            render: (tags) => (
                <>
                    {tags && tags.map((tag) => (
                        <Tag color="green" key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Standards',
            dataIndex: 'standard_tags',
            key: 'standard_tags',
            render: (tags) => (
                <>
                    {tags && tags.map((tag) => (
                        <Tag color="purple" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
    ];

    return (
        <div className="page-container">
            <SearchBar setLessonPlans={setLessonPlans} />
            <Table
                columns={columns}
                dataSource={lessonPlans}
                rowKey={(record) => record.id}
                className="search-results-container"
                onRow={(record) => ({
                    onClick: () => navigate(`/lesson/${record.id}`),
                })}
            />
        </div>
    );
};

export default SearchPage;

