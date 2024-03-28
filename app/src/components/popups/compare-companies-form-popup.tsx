import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react';
import Modal from "../UI/modal";
import useData from "../../hooks/useData";
import {AppCompanyType} from "../../constants/types";
import Select from "../UI/select";
import Button from "../UI/button";
import {useNavigate} from "react-router-dom";

const CompareCompaniesFormPopup = forwardRef(({}, ref) => {
  const navigate = useNavigate()
  const [firstCompanyId, setFirstCompanyId] = useState<number|null>(null)
  const [secondCompanyId, setSecondCompanyId] = useState<number|null>(null)

  const companies: AppCompanyType[] = useData('companies')

  const filteredCompanies = useCallback((selectedId: number|null) => {
    return companies
        ? companies.filter(c => c.id !== selectedId).map(c => ({
          id: c.id,
          name: c.full_name
        }))
        : []
  }, [companies])

  const [errors, setErrors] = useState<boolean[]>([])

  const modal = useRef<any>(null)

  const show = useCallback((firstCompanyId?: number) => {
    firstCompanyId&& setFirstCompanyId(firstCompanyId)
    modal.current.show()
  }, [modal.current])

  const goToComparing = () => {
    navigate(`/companies/${firstCompanyId}/${secondCompanyId}`)
    modal.current.hide()
  }

  useImperativeHandle(ref, () => ({ show }))

  return (
      <Modal ref={modal} title={"Сравнить компании"}>
        <div className={"flex flex-col gap-xl mt-md"}>
          <div className={"flex gap-md"}>
            <Select
                items={filteredCompanies(secondCompanyId)}
                selectedId={firstCompanyId}
                placeholder={"Выбрать первую комапнию"}
                onChange={id => setFirstCompanyId(id)}
            />
            <Select
                items={filteredCompanies(firstCompanyId)}
                selectedId={secondCompanyId}
                placeholder={"Выбрать вторую комапнию"}
                onChange={id => setSecondCompanyId(id)}
            />
          </div>
          <div className={"flex flex-col gap-xm"}>
            {errors.map((err, index) => (
                <div className={"bg-red bg-opacity-60 rounded"}></div>
            ))}
          </div>
          <Button onClick={goToComparing}>Сравнить</Button>
        </div>
      </Modal>
  );
})

export default CompareCompaniesFormPopup;