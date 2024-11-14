import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import SearchBar from "../../components/SearchBar/SearchBar";
import { listLessonPlans } from "../../util/dynamo";
import { LessonPlanApprovalStates } from "../../util/constants";
import "./SearchPage.css";

const SearchPage = () => {
    const [lessonPlans, setLessonPlans] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

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
            render: (_, record) => {
                let gradeLower = record.grade_level_lower === 0 ? "K" : record.grade_level_lower;
                let gradeUpper = record.grade_level_upper === 0 ? "K" : record.grade_level_upper;
                return gradeLower === gradeUpper ? `${gradeLower}` : `${gradeLower} - ${gradeUpper}`;
            },
            sorter: (a, b) => a.grade_level_lower - b.grade_level_lower, // Sort by grade_level_lower
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Math Concepts',
            dataIndex: 'math_concept_tags',
            key: 'math_concept_tags',
            render: (tags) => (
                <>
                    {tags && tags.map((tag) => (
                        <Tag color="blue" key={tag} onClick={() => setSearchQuery(tag)}>
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
                        <Tag color="green" key={tag} onClick={() => setSearchQuery(tag)}>
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
                        <Tag color="purple" key={tag} onClick={() => setSearchQuery(tag)}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'View',
            key: 'action',
            render: (record) => <a href={`/lesson/${record.id}`}>View more</a>,
        },
    ];

    return (
        <div className="page-container">
            <SearchBar
                setLessonPlans={setLessonPlans}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Table
                columns={columns}
                dataSource={lessonPlans}
                rowKey={(record) => record.id}
                className="search-results-container"
                onChange={(pagination, filters, sorter) => console.log('Table params:', pagination, filters, sorter)}
            />
        </div>
    );
};

export default SearchPage;
