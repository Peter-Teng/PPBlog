package com.marvelouspp.ppblog.domain.VO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageVo {

    private List<?> rows;

    private Long total;
}
