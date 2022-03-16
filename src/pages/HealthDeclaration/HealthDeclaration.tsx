import { Alert } from "@mui/material";

import { useForm } from "react-hook-form";
import FormHealth from "./FormHealth";

import { Box } from "@mui/system";
import React from "react";

import {
  getHealthDeclaration,
  getTriggerSurvey,
  setHealthDeclaration,
} from "../../services/SurveyService";
import { LocalStorageKey } from "../../configs/consts";

// Customize Select

export interface IQuestionData {
  answerOption: string;
  answerOptions: { en: string; vi: string }[];
  isHidden: boolean;
  isRequired: boolean;
  questionVI: string;
  questionEN: string;
  question: string;
  sort: number;
  subType: string;
  type: string;
  language: string;
  isCollapseForm: boolean;
}

const HealthDeclaration: React.FC = () => {
  const [data, setData] = React.useState<any>();
  const [triggers, setTriggers] = React.useState<any>();
  const [wrong, setWrong] = React.useState<boolean>(false);
  const { control, handleSubmit, getValues, setValue, register } = useForm();
  const [loading, setLoading] = React.useState<boolean>(true);
  const language = localStorage.getItem(LocalStorageKey.LANGUAGE) === "1" || "" ? "vi" : "en";
  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const getData = async () => {
    const response = await getHealthDeclaration();
    const responseTrigger = await getTriggerSurvey();
    response.subscribe((res: any) => {
      if (res.data.data.customFormData.questions !== null) {
        const questionData = res?.data.data.customFormData.questions.map(
          (item: IQuestionData, index: number) => {
            const answerOptions: { vi: string; en: string }[] = [];
            // eslint-disable-next-line array-callback-return
            JSON.parse(item.answerOption).map((item: string) => {
              answerOptions.push({
                vi: JSON.parse(item).vi,
                en: JSON.parse(item).en,
              });
            });
            return {
              answerOptions: answerOptions,
              isHidden: !!item.isHidden,
              isRequired: !!item.isRequired,
              questionVI: JSON.parse(item.question).vi,
              questionEN: JSON.parse(item.question).en,
              sort: item.sort,
              type: item.type,
              isCollapseForm: true,
              language: language,
              hideForm: false,
              subType: item.subType,
              isTrigger: index === 1 || index === 2 || index === 3 ? true : false,
            };
          }
        );

        setData(res.data.data);

        responseTrigger.subscribe((response: any) => {
          setTriggers(response.data.data);
        });
        // setQuestions(questionData);
        setLoading(false);
        setValue("Form", questionData);
      }
    });
  };

  const onSubmit = async (values: any) => {
    const questionsReq = await values.Form?.map((item: IQuestionData, index: number) => {
      const answerOption: string[] = [];
      // eslint-disable-next-line array-callback-return
      item.answerOptions.map((itemAnswer) => {
        answerOption.push(JSON.stringify(itemAnswer));
      });
      return {
        answerOption: item.type === "4" ? "[]" : JSON.stringify(answerOption),
        isCollapseForm: false,
        isHidden: item.isHidden ? 1 : 0,
        isRequired: item.isRequired ? 1 : 0,
        isTrigger: index === 1 || index === 2 || index === 3 ? true : false,
        isVietnameseQuestion: true,
        question: JSON.stringify({
          vi: item.questionVI,
          en: item.questionEN,
        }),
        questionEn: item.questionEN,
        questionVi: item.questionVI,
        sort: index,
        subType: item.type === "4" ? item.subType : "",
        triggerId: index === 1 ? 1784 : index === 2 ? 1785 : index === 3 ? 1786 : null,
        type: item.type,
      };
    });
    // console.log(values.Form);
    // console.log(questionsReq);
    const request = {
      ...data.customFormData,
      answers: [],
      applyForAllSite: false,
      id: null,
      questions: questionsReq,
      triggers: triggers,
    };

    // console.log(request);

    setHealthDeclaration(request).subscribe((response) => {
      if (response) {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
        }, 1000);
      }
    });
  };

  return (
    <Box>
      {wrong === true ? (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            ml: 2,
          }}
        >
          <Alert sx={{ width: "400px" }} variant="filled" severity="success">
            Successfully!
          </Alert>
        </Box>
      ) : (
        <></>
      )}
      {/* Form */}
      <Box sx={{ px: 2 }}>
        {loading === false ? (
          <form onSubmit={handleSubmit(onSubmit)} className="formHealth">
            <FormHealth
              control={loading ? null : control}
              register={loading ? null : register}
              setValue={loading ? null : setValue}
              getValues={loading ? null : getValues}
              language={language}
            />
          </form>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default HealthDeclaration;
